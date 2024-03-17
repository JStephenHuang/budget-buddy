"use client";

import React, { useState, useEffect } from "react";
import { GET } from "../api/receipts/route";
import { POST } from "../api/read/route";

export default function TaxToolPage() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [info, setInfo] = useState({
    date: 'Unknown',
    taxes: 0.0,
    total: 0.0,
    vendor: {
      name: 'Unknown',
      type: 'Unknown'
    }
  });
  const [revealInfo, setRevealInfo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileStr, setFileStr] = useState<string>('')
  const [stats, setStats] = useState({})

  const readReceipt = async () => {
    if (fileStr) {
      setLoading(true);
      const response = await POST(fileStr)
      setLoading(false);
      setInfo(response)
      if (info) setRevealInfo(true);
    }
  }

  useEffect(() => {
    const init = async () => {
      const response = await GET()
      setStats(response)
    }
    init()
  }, [])

  console.log(stats)

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    setRevealInfo(false);
    setPreview(null);
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const file = new FileReader();

    file.readAsDataURL(target.files[0]);

    file.onload = function () {
      if (typeof file.result === "string") {
        setFileStr(file.result)
      }
      setPreview(file.result);
    };
  }

  return (
    <div className="mt-[--navh] p-[--spacing]">
      <section className="flex gap-[--spacing]">
        <div className="w-1/2 flex flex-col gap-[--spacing]">
          <h1 className="title">BUDGET BUDDY'S RECEIPT TOOL</h1>
          <p>
            How to use... Just upload an image of a recent receipt and we'll
            track everything for you!
          </p>
          <p>Input your receipt here!</p>

          <input type="file" name="image" onChange={handleOnChange} />
          {preview && (
            <button onClick={readReceipt} className="button">
              Start scan
            </button>
          )}
          {loading && <section>Loading...</section>}
        </div>
        {preview ? (
          <img
            className="w-1/2 aspect-square object-cover"
            src={preview.toString()}
            alt=""
          />
        ) : (
          <div className="w-1/2 aspect-square border grid place-items-center border-black">
            Receipt Image placeholder
          </div>
        )}
      </section>
      {revealInfo && (
        <section className="mt-[--navh] flex gap-[--spacing]">
          <div className="w-1/2">
            <h1 className="title">YOUR RECEIPT</h1>
            <div className="w-full">
              <p>Company: {info.vendor.name || 'Unknown'}</p>
              <p>Type: {info.vendor.type || 'Unknown'}</p>
              <p>Tax paid: {(info.taxes || 0.0).toFixed(2)} $</p>
              <p>Date: {info.date || 'Unknown'}</p>
              <p>Total: {(info.total|| 0.0).toFixed(2)} $</p>
            </div>
          </div>

          <div className="w-2/3">
            <h1 className="title">LOGISTICS</h1>

            <div className="">
              Looks like you were spending your money on some snacks! This data
              will be saved and we'll update your overall spendings aswell as
              your overall behavior. Here's an idea of your spendings.
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
