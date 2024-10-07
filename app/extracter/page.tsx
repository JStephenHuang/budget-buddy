"use client";

import React, { useEffect, useState } from "react";
import { useTesseract } from "@/src/hooks/useTesseract";
import Tesseract, { recognize } from "tesseract.js";

export default function Extracter() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { isLoading, logs, worker } = useTesseract();
  const [lines, setLines] = useState<Tesseract.Line[] | null>(null);
  const [items, setItems] = useState<number[] | null>(null);

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    setPreview(null);

    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const file = new FileReader();

    file.readAsDataURL(target.files[0]);

    file.onload = function () {
      setPreview(file.result);
    };
  }

  async function extract() {
    if (!worker) return;
    if (!preview) return;

    // await worker.loadLanguage("eng");
    // await worker.initialize("eng");

    // const {
    //   data: { text },
    // } = await worker.recognize(preview.toString());

    // return setText(text);
    try {
      const res = await recognize(preview.toString());
      setLines(res.data.lines);
      const amounts = res.data.text.match(/\d+\.\d{2}\b/g) || [];
      const items = Array.from(
        new Set(amounts.map((amount) => parseFloat(amount)))
      );

      setItems(items.filter((item) => item !== Math.max(...items)));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-[--spacing]">
      <section className="flex gap-[--spacing]">
        {preview ? (
          <div className="w-1/2 flex flex-col gap-[--spacing]">
            <img
              className="w-full h-[60vh] aspect-square object-contain"
              src={preview.toString()}
              alt=""
            />
            <button
              onClick={() => {
                setLines(null);
                setPreview(null);
              }}
              className="px-[2rem] py-[0.75rem] bg-red-300 border border-red-300"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="w-1/2 h-[60vh] border grid place-items-center border-black">
            <input
              className=""
              type="file"
              name="image"
              onChange={handleOnChange}
            />
          </div>
        )}

        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="title">RECEIPT EXTRACTOR</h1>
          <p>
            How to use... Simply upload a photo of your recent receipt, and
            we&apos;ll handle the rest, tracking all your expenses seamlessly!
          </p>

          {preview &&
            (!isLoading ? (
              <div className="w-full">
                {lines && items ? (
                  <div className="flex flex-col">
                    <p className="text-[1.5rem] font-bold">
                      Results: (what we detected)
                    </p>
                    <hr className="py-2" />
                    <div>
                      {items.map((item, key) => (
                        <p>
                          Item {key + 1}: ${item}
                        </p>
                      ))}
                      Total: ${Math.max(...items)}
                    </div>
                    {/* <div className="whitespace-pre-line">
                      {lines.map((line) => {
                        if (line.text.includes("$")) {
                          return line.text;
                        }
                      })}
                    </div> */}
                  </div>
                ) : (
                  <button onClick={extract} className="w-full button">
                    Extract
                  </button>
                )}
              </div>
            ) : (
              <div>Loading</div>
            ))}

          {/* {preview &&
            (!isLoading ? (
              <div className="w-full">
                {logs && (
                  <div>
                    <p>{logs.status}</p>
                    <div className="flex items-center gap-4">
                      {(logs.progress * 100).toFixed(2)}%
                      <div
                        className="w-full bg-yellow-300 h-2.5"
                        style={{ width: `${logs.progress * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {text ? (
                  <p>{text}</p>
                ) : (
                  <button onClick={extract} className="w-full button">
                    Extract
                  </button>
                )}
              </div>
            ) : (
              <div>Loading</div>
            ))} */}
        </div>
      </section>
    </div>
  );
}
