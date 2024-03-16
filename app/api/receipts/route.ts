import axios from "axios";
import { getAll } from "@/src/read-receipt";

export async function GET(_request: Request) {
  console.log("GET /api/members");

  try {
    console.log(_request.body);
    return Response.json(
      await axios("https://api.veryfi.com/api/v8/partner/documents", {
        method: "POST",
        maxBodyLength: Infinity,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
          Accept: "application/json",
          "CLIENT-ID": "vrf1oZgHUxnMyXzpIB6UbPtyrKSSI5dGWX676U7",
          Authorization: "apikey cedricdara:caa4e9db3896a04a9719c1859270ffe4",
        },
        data: _request.body,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return Response.json({ error: error.message }, { status: 404 });

    return Response.json({ error: "unknown error" }, { status: 404 });
  }
}
