import axios from "axios";

export const getAllBithdays = async () => {
    const response = await axios.get("http://127.0.0.1:8000/birthdays")
    return response.data;
}