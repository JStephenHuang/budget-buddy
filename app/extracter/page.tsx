"use client";

import React, { useState } from "react";
import { useTesseract } from "@/src/hooks/useTesseract";
import Tesseract from "tesseract.js";
import Image from "next/image";

interface ReceiptData {
  subtotal: number | null;
  tax: number | null;
  total: number | null;
  items: Array<{
    description: string;
    price: number;
  }>;
  raw: string;
}

export default function Extracter() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { isLoading, worker } = useTesseract();
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [processingStage, setProcessingStage] = useState<string>("");

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    setPreview(null);
    setReceiptData(null);

    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    if (!target.files || target.files.length === 0) return;

    const file = new FileReader();
    file.readAsDataURL(target.files[0]);

    file.onload = function () {
      setPreview(file.result);
    };
  }

  /**
   * Parse receipt text using line-by-line regex analysis
   * @param text - Raw text from OCR
   * @returns - Structured receipt data
   */
  const parseReceiptText = (text: string): ReceiptData => {
    // Initialize receipt data structure
    const receiptData: ReceiptData = {
      subtotal: null,
      tax: null,
      total: null,
      items: [],
      raw: text,
    };

    // Split text into lines for line-by-line processing
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    // Regular expressions for dollar amounts
    const dollarAmountRegex = /\$?\s*(\d+\.\d{2})/;

    // Line by line analysis
    lines.forEach((line) => {
      // Convert to lowercase for case-insensitive matching
      const lowerLine = line.toLowerCase();

      // Check for dollar amount in the line
      const amountMatch = line.match(dollarAmountRegex);
      if (!amountMatch) return; // Skip lines without dollar amounts

      const amount = parseFloat(amountMatch[1]);

      // Check for tax indicators
      if (
        lowerLine.includes("tax") ||
        lowerLine.includes("vat") ||
        lowerLine.includes("gst") ||
        lowerLine.includes("hst") ||
        lowerLine.includes("tps") ||
        lowerLine.includes("tvq")
      ) {
        receiptData.tax = amount;
        return;
      }

      // Check for subtotal indicators
      if (lowerLine.includes("sub") && (lowerLine.includes("total") || lowerLine.includes("tot"))) {
        receiptData.subtotal = amount;
        return;
      }

      // Check for total indicators
      // Total should be at the end and often has specific keywords
      if (
        (lowerLine.includes("total") ||
          lowerLine.includes("amount") ||
          lowerLine.includes("amt") ||
          lowerLine.includes("sum")) &&
        !lowerLine.includes("sub")
      ) {
        // Exclude subtotal
        receiptData.total = amount;
        return;
      }

      // If none of the above, consider it a regular item
      // Extract description by removing the price part
      const description = line.replace(dollarAmountRegex, "").trim();

      // Only add as an item if there's some description text
      if (description.length > 0) {
        receiptData.items.push({
          description,
          price: amount,
        });
      }
    });

    // If total wasn't found, use the largest amount as a fallback
    if (receiptData.total === null) {
      let allAmounts = [];

      // Collect all amounts
      if (receiptData.subtotal !== null) allAmounts.push(receiptData.subtotal);
      if (receiptData.tax !== null) allAmounts.push(receiptData.tax);
      receiptData.items.forEach((item) => allAmounts.push(item.price));

      if (allAmounts.length > 0) {
        receiptData.total = Math.max(...allAmounts);
      }
    }

    return receiptData;
  };

  /**
   * Main function to extract receipt data
   */
  async function extract() {
    if (!worker || !preview) return;

    try {
      setProcessingStage("Performing OCR...");

      // Perform OCR with optimized settings for receipt text
      const result = await Tesseract.recognize(preview.toString(), "eng", {
        tessedit_char_whitelist:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.$:,%- ",
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      } as any);

      setProcessingStage("Analyzing receipt data...");

      // Parse the extracted text line by line
      const parsedData = parseReceiptText(result.data.text);
      setReceiptData(parsedData);
      setProcessingStage("");
    } catch (error) {
      console.error("Error during extraction:", error);
      setProcessingStage("Error occurred during processing");
    }
  }

  function resetForm() {
    setPreview(null);
    setReceiptData(null);
    setProcessingStage("");
  }

  return (
    <div className="p-[--spacing]">
      <section className="flex gap-[--spacing]">
        {preview ? (
          <div className="w-1/2 flex flex-col gap-[--spacing]">
            <Image
              className="w-full h-[60vh] aspect-square object-contain"
              src={preview.toString()}
              alt="Receipt preview"
              width={500}
              height={800}
            />
            <button
              onClick={resetForm}
              className="px-[2rem] py-[0.75rem] bg-red-300 border border-red-300"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="w-1/2 h-[60vh] border grid place-items-center border-black">
            <div className="text-center">
              <h3 className="mb-4 font-semibold">Upload Receipt</h3>
              <input
                className="block mx-auto"
                type="file"
                name="receipt"
                accept="image/*"
                onChange={handleOnChange}
              />
              <p className="mt-2 text-sm text-gray-500">Supports images (JPG, PNG, ...)</p>
            </div>
          </div>
        )}

        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="title">RECEIPT EXTRACTOR</h1>
          <p>
            How to use... Simply upload a photo of your receipt, and we&apos;ll handle the rest,
            extracting subtotal, tax, and total amounts automatically!
          </p>

          {preview &&
            (!isLoading ? (
              <div className="w-full">
                {processingStage && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="font-mono">{processingStage}</p>
                  </div>
                )}

                {receiptData ? (
                  <div className="flex flex-col">
                    <p className="text-[1.5rem] font-bold">Results:</p>
                    <hr className="py-2" />

                    <div className="font-mono bg-gray-50 p-4 rounded border border-gray-200">
                      {receiptData.items.length > 0 && (
                        <div className="mb-4">
                          <p className="font-bold mb-2">Items:</p>
                          {receiptData.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between mb-1">
                              <span className="truncate mr-4">{item.description}</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="border-t border-gray-300 pt-3 mt-3">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>
                            {receiptData.subtotal !== null
                              ? `$${receiptData.subtotal.toFixed(2)}`
                              : "Not found"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>
                            {receiptData.tax !== null
                              ? `$${receiptData.tax.toFixed(2)}`
                              : "Not found"}
                          </span>
                        </div>

                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>
                            {receiptData.total !== null
                              ? `$${receiptData.total.toFixed(2)}`
                              : "Not found"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <details className="mt-4">
                      <summary className="cursor-pointer mb-2">View Raw OCR Text</summary>
                      <pre className="font-mono text-xs bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap">
                        {receiptData.raw}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <button
                    onClick={extract}
                    className="w-full px-[2rem] py-[0.75rem] bg-amber-400 border border-amber-400 hover:bg-transparent text-black transition"
                  >
                    Extract Receipt Data
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full p-4 text-center">
                <p className="font-mono">Initializing OCR engine...</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
