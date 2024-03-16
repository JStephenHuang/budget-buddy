"use client";

import React, { useState } from "react";

import Image from "next/image";

export default function TaxToolPage() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | undefined>();

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
      <section className="flex">
        <div className="w-1/2 flex flex-col gap-[3rem]">
          <h1 className="title">BUDGET BUDDY'S RECEIPT TOOL</h1>
          <p>
            How to use... Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Soluta adipisci dolorem deserunt fuga quasi.
          </p>
          <p>Input your receipt here!</p>
          <input type="file" name="image" onChange={handleOnChange} />
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
