import axios from "axios"
import { useEffect, useState } from "react";


function useAxiosSecure() {

    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token)
    },[])

    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    });
    


  return axiosSecure
}

export default useAxiosSecure