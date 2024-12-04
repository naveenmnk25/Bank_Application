import axios from "axios";

export const baseapi = axios.create({
  baseURL: "https://localhost:44372/api",
});