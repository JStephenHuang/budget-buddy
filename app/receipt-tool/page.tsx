"use client";

import React, { useState } from "react";

import Image from "next/image";
import { upload } from "@/src/read-receipt";

// const getReceipts = async () => {
//   const res = await fetch(`${process.env.BASE_URL}/api/receipts`, {
//     cache: "force-cache",
//   });

//   if (!res.ok) throw new Error("Unable to fetch member");

//   return res.json();
// };

// const readReceipt = async (file: string) => {
//   const res = await fetch(`/api/read`, {
//     method: "POST",
//     body: JSON.stringify({
//       file_data: file,
//       country: "CA",
//     }),
//   });

//   if (!res.ok) throw new Error("Unable to read receipt");

//   const data = await res.json();

//   const receiptInfo = JSON.parse(data);

//   console.log(receiptInfo.file_data);
//   return data.file_data;
// };
export default function ReceiptToolPage() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [revealInfo, setRevealInfo] = useState<boolean>(false);

  const readReceipt = (file: string) => {
    setRevealInfo(true);
  };

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);

    const file = new FileReader();

    file.readAsDataURL(target.files[0]);

    file.onload = function () {
      setPreview(file.result);
    };
  }

  return (
    <div className="mt-[--navh] p-[3rem]">
      <section className="flex gap-[3rem]">
        <div className="w-1/2 flex flex-col gap-[3rem]">
          <h1 className="title">BUDGET BUDDY'S RECEIPT TOOL</h1>
          <p>
            How to use... Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Soluta adipisci dolorem deserunt fuga quasi.
          </p>
          <p>Input your receipt here!</p>
          <input type="file" name="image" onChange={handleOnChange} />

          {preview && (
            <button
              onClick={() => readReceipt(preview.toString())}
              className="button"
            >
              Scan receipt
            </button>
          )}
        </div>
        {preview ? (
          <img
            className="w-1/2 aspect-square object-cover"
            src={preview.toString()}
            alt=""
          />
        ) : (
          <div className="w-1/2 aspect-square border grid place-items-center border-black">
            Input Receipt
          </div>
        )}
      </section>
    </div>
  );
}
