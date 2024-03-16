"use client";

import React, { useState } from "react";

import Image from "next/image";
import { dollarama } from "@/src/docs";

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <li className="w-full flex justify-between items-center">
      <p>-{label}</p>
      <p>{value}</p>
    </li>
  );
};

const InfoLine = ({ label, value }: { label: string; value: string }) => {
  return (
    <li className="w-full flex justify-between items-center">
      <p>{label}</p>
      <p>{value}$</p>
    </li>
  );
};

export default function TaxToolPage() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [revealInfo, setRevealInfo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const readReceipt = async () => {
    setLoading(true);
    await timeout(1000);
    setLoading(false);
    setRevealInfo(true);
  };

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    setRevealInfo(false);
    setPreview(null);
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

  const totalTax = dollarama.tps + dollarama.tvq;

  let total = totalTax;

  dollarama.items.map((items: { name: string; price: number }) => {
    total += items.price;
  });

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
              {Object.keys(dollarama).map((keyName, i) =>
                keyName !== "items" ? (
                  <div className="w-full flex justify-between" key={i}>
                    <span className="">{keyName}: </span>
                    <span>{dollarama[keyName]}</span>
                  </div>
                ) : null
              )}
              <p>items:</p>
              <div className="w-full flex justify-between">
                <ul className="w-full list-disc flex flex-col items-center">
                  {dollarama.items.map(
                    (item: { name: string; price: number }, key: number) => (
                      <Item
                        key={key}
                        label={item.name}
                        value={`${item.price}$`}
                      />
                    )
                  )}
                </ul>
              </div>
              <InfoLine label="total tax:" value={totalTax} />
              <InfoLine label="total tax:" value={total} />
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
