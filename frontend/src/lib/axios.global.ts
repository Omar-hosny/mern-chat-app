import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend server
  withCredentials: true, // to send cookies to the server
  headers: {
    "Content-Type": "application/json",
  },
});
