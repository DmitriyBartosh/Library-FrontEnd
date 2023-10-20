import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.GATSBY_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      return window.localStorage.removeItem("user");
    }

    throw error;
  }
);

export default axiosClient;
