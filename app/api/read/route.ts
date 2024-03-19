import axios from "axios";

export async function POST(_request: Request) {
  const body = await _request.json();
  console.log(body);

  const data = {
    file_data: body.fileStr,
  };
  try {
    const response = await axios.post("http://localhost:3001/upload", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
