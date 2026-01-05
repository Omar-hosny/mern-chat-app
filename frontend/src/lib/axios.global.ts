import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend server
  headers: {
    "Content-Type": "application/json",
  },
});
