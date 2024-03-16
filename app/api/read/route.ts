import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(_request: Request) {
  const body = JSON.stringify(await _request.json());
  try {
    return Response.json(
      await axios({
        method: "POST",
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
        data: body,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error, Response);
      return Response.json({ error: error.message }, { status: 404 });
    }

    return Response.json({ error: "unknown error" }, { status: 404 });
  }
}
