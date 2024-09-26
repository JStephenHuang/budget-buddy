import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get('http://localhost:3001/upload')
    return response.data
  } catch (error) {
    console.error('Error:', error);
  }
}
