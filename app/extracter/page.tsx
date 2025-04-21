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
  const [fileType, setFileType] = useState<"image" | null>(null);
  const [fileName, setFileName] = useState<string>("");
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

    const file = target.files[0];
    setFileName(file.name);

    const fileReader = new FileReader();

    // Determine file type
    if (file.type.startsWith("image/")) {
      setFileType("image");
    } else {
      alert("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    fileReader.readAsDataURL(file);

    fileReader.onload = function () {
      setPreview(fileReader.result);
    };
  }

  /**
   * Parse receipt text to extract structured data
   * @param text - Raw text from OCR
   * @returns - Structured receipt data
   */
  const parseReceiptText = (text: string): ReceiptData => {
    // Normalize text by removing extra spaces and converting to lowercase
    const normalizedText = text.toLowerCase().trim();
    const lines = normalizedText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    // Initialize receipt data structure
    const receiptData: ReceiptData = {
      subtotal: null,
      tax: null,
      total: null,
      items: [],
      raw: text,
    };

    // Regular expressions for finding relevant data
    const subtotalRegex = /sub[-\s]*total[\s:]*\$?\s*(\d+\.\d{2})/i;
    const taxRegex = /(?:tax|vat|gst|hst|TPS|tps|T™VQ|TVQ|tvq)[\s:]*\$?\s*(\d+\.\d{2})/i;
    const totalRegex = /(?:TOTAL|total|amt|amount|sum)[\s:]*\$?\s*(\d+\.\d{2})/i;

    // Helper function to extract price using regex
    const extractPrice = (regex: RegExp, str: string): number | null => {
      const match = str.match(regex);
      if (match && match[1]) {
        return parseFloat(match[1]);
      }
      return null;
    };

    // Try to find subtotal, tax, and total in the entire text first
    receiptData.subtotal = extractPrice(subtotalRegex, normalizedText);
    receiptData.tax = extractPrice(taxRegex, normalizedText);
    receiptData.total = extractPrice(totalRegex, normalizedText);

    // If total wasn't found with regex, try to find the largest number in the receipt
    if (!receiptData.total) {
      const allAmounts = normalizedText.match(/\d+\.\d{2}/g) || [];
      const numberAmounts = allAmounts.map((amount) => parseFloat(amount));

      if (numberAmounts.length > 0) {
        receiptData.total = Math.max(...numberAmounts);
      }
    }

    // Try to extract items with prices
    const itemPriceRegex = /(.+?)\s+\$?\s*(\d+\.\d{2})\s*$/;

    for (const line of lines) {
      const match = line.match(itemPriceRegex);

      if (match && match[1] && match[2]) {
        const description = match[1].trim();
        const price = parseFloat(match[2]);

        // Skip if this appears to be a subtotal, tax, or total line
        if (
          line.includes("subtotal") ||
          line.includes("tax") ||
          line.includes("total") ||
          line.includes("sum") ||
          line.includes("amount")
        ) {
          continue;
        }

        receiptData.items.push({
          description,
          price,
        });
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
      setProcessingStage("Preparing document...");

      // Process based on file type
      let imageToProcess = preview.toString();

      setProcessingStage("Performing OCR...");

      // Perform OCR with optimized settings
      const result = await Tesseract.recognize(imageToProcess, "eng", {
        tessedit_char_whitelist:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.$:,%- ",
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      } as any);

      setProcessingStage("Analyzing receipt data...");

      // Parse the extracted text
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
    setFileType(null);
    setFileName("");
    setProcessingStage("");
  }

  return (
    <div className="p-[--spacing]">
      <section className="flex gap-[--spacing]">
        {preview ? (
          <div className="w-1/2 flex flex-col gap-[--spacing]">
            <div className="relative w-full h-[60vh] border border-gray-300">
              {fileType === "image" ? (
                <Image
                  className="w-full h-full object-contain"
                  src={preview.toString()}
                  alt="Receipt preview"
                  width={500}
                  height={800}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="font-mono text-lg">{fileName}</p>
                </div>
              )}
            </div>
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
                    className="w-full px-[2rem] py-[0.75rem] bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 transition"
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
