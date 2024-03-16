import axios, { AxiosRequestConfig } from "axios";

import dotenv from "dotenv";

export const getAll = async () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    withCredentials: true,
    url: "https://api.veryfi.com/api/v8/partner/documents",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "CLIENT-ID": "vrf1oZgHUxnMyXzpIB6UbPtyrKSSI5dGWX676U7",
      AUTHORIZATION: "apikey cedricdara:caa4e9db3896a04a9719c1859270ffe4",
    },
  };

  const response = await axios(config);
  const documents = response.data.documents;

  const info = documents.map(
    (document: { total: number; vendor: { category: string } }) => [
      document.total,
      document.vendor.category,
    ]
  );

  console.log(info);
  return info;
};

export const upload = async (file: string) => {
  const data = JSON.stringify({
    file_data: file,
    country: "CA",
  });

  const config: AxiosRequestConfig = {
    method: "post",
    maxBodyLength: Infinity,
    withCredentials: true,
    url: "https://api.veryfi.com/api/v8/partner/documents",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
      Accept: "application/json",
      "CLIENT-ID": "vrf1oZgHUxnMyXzpIB6UbPtyrKSSI5dGWX676U7",
      Authorization: "apikey cedricdara:caa4e9db3896a04a9719c1859270ffe4",
    },
    data: data,
  };

  const response = await axios(config);

  console.log(response.data);
  console.log(response.headers);
  return response.data;
};
