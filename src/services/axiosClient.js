import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.GATSBY_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      return window.localStorage.removeItem("token");
    }

    throw error;
  }
);

export default axiosClient;
