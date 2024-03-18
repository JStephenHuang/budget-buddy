import axios from "axios";

export async function POST(file: string) {
  const data = {
    file_data: file
  }

  try {
    const response = await axios.post('http://localhost:3001/upload', data)
    return response.data
  } catch (error) {
    console.error('Error:', error);
  }
}
