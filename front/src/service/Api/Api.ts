import axios from "axios";

const baseUrl: string = "/api/";

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 60000
});