import axios from "axios";

function useAxiosCommon() {
  const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  return axiosCommon;
}

export default useAxiosCommon;
