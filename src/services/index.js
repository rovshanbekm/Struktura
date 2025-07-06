import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN } from "@/constants";
import { logout } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";

export const request = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// request.interceptors.request.use((config) => {
//   const token = Cookies.get(TOKEN);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

request.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.data?.status === 401 && err.response?.data?.message === "Unauthorized!") {
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default request;
