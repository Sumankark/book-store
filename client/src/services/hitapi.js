import axios from "axios";

export let hitApi = axios.create({
 // baseURL: "http://localhost:8080",
  baseURL: "https://book-store-0f43.onrender.com",
});
