import { useEffect, useState } from "react";
import Construction from "../../Components/Home/Construction";
import Hero from "../../Components/Home/Hero";
import Navbar from "../../Shared/Navbar";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import toast from "react-hot-toast";


function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosCommon.get("/system-setting");
        setData(response?.data?.data);
        console.log(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      <Navbar />
      <Hero homePageData={data} />
    
      <Construction homePageData={data} />
    </>
  );
}

export default Home;
