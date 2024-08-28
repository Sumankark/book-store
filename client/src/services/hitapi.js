import axios from "axios";

export let hitApi = axios.create({
  baseURL: "http://localhost:8080",
  //   baseURL: "https://book-store-server-tks6.onrender.com",
});
