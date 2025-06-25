import React, { useEffect, useState } from "react";
import Container from "../../Shared/Container";
import Conmap from "../../Assets/Images/Pricing/conmap.png";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/api-hooks/useAxiosSecure";
import { Loader, MoveLeft } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const Pricingcard = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [payLoad, setPayLoad] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosCommon.get("/packages");
        setPackages(response.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // const Pricinginfo = [
  //   {
  //     id: 1,
  //     plan: "Basic",
  //     price: 19,
  //     currency: "USD",
  //     features: [
  //       "50 customers Only",
  //       "5 Gigabyte of Space",
  //       "200 SMS per week",
  //       "Customize Birthday Message",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     plan: "Premium",
  //     price: 54,
  //     currency: "USD",
  //     features: [
  //       "100 customers Only",
  //       "10 Gigabyte of Space",
  //       "500 SMS per week",
  //       "Customize Birthday Message",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     plan: "Premium Plus",
  //     price: 89,
  //     currency: "USD",
  //     features: [
  //       "1000 customers Only",
  //       "100 Gigabyte of Space",
  //       "5000 SMS per week",
  //       "Customize Birthday Message",
  //     ],
  //     tag: "MOST POPULAR",
  //   },
  // ];

  // const handlePlan = async (id) => {
  //   setActiveId(id)
  //   setPayLoad(true)
  //   try{
  //     const result = await axiosSecure.post('/payment-intent' , {package_id : id})
  //     setPayLoad(false)
  //     window.location = result?.data?.session_url
  //     setActiveId(null)
  //   }catch(err) {
  //     console.log(err);
  //     setPayLoad(false)
  //     setActiveId(false)
  //   }
  // }

    // get subscription status

  const {data: subscriptionStatus = {} , isLoading} = useQuery({
    queryKey: ['subscriptionStatus'],
    queryFn: async  () => {
      const res = await axiosSecure.get('/user-subscription-check')
      console.log( 'data', res?.data);
      return res?.data?.data

    }
  })

  console.log( 'subscriptionData', subscriptionStatus);

  return (
    <section className="bg-[#FFFFFF] ">
      <Container>
        <Link to={'/'} className="">
          <button className="flex items-center cursor-pointer gap-3 px-6 py-3 rounded-md bg-primary01 text-white group">
            {" "}
            <MoveLeft size={20} className={"group-hover:-translate-x-1 transition-all duration-300 "} /> Back
          </button>
        </Link>
        <Link
          to="/"
          className="flex justify-center items-center bg-[#007570] py-3 px-5 md:py-5 md:px-7 rounded-[7px] mx-auto w-fit"
        >
          <img
            src={Conmap}
            alt="Conmap"
            className="w-20 md:w-[95px] xl:w-[110px]"
          />
        </Link>
        <h3 className="text-[#007570] text-xl md:text-2xl uppercase font-nunito font-semibold text-center pt-3">
          Construction site
        </h3>
        <h4 className="mt-5 lg:mt-20 pb-1 text-3xl xl:text-[48px] font-semibold text-[#333] text-center font-nunito">
          Upgrade To Premium
        </h4>
        <p className="text-xl pt-4 md:text-2xl text-[#252525] font-normal text-center">
          Choose best plan what works for you
        </p>
        {loading ? (
         <LoadingSpinner loading={loading}/>
        ) : (
          <div className="grid lg:grid-cols-3 gap-3 md:gap-5 xl:gap-9 justify-center mt-14 relative">
            {packages.map((cardinfo, index) => (
              <div
                key={index}
                className={`border border-[#007570] transition-all hover:translate-y-2 p-7 xl:p-[40px] rounded-[16px]  group hover:bg-[#007570] duration-300 ease-in-out cursor-pointer relative flex flex-col max-w-[400px] lg:max-w-[500px] w-full`}
              >
                <div>
                  <div className="absolute top-5 right-5">
                    {cardinfo?.popular_status && (
                      <button className="bg-[#007570] group-hover:bg-[#F5F9FF] duration-300 transition-all group-hover:text-[#007570] py-[10px] px-[25px] rounded-[21.596px] text-[#FFF] text-center font-semibold font-nunito">
                        {"Most Popular"}
                      </button>
                    )}
                  </div>
                  <h2 className="text-4xl xl:text-[48px] pt-6 duration-300 transition-all font-semibold font-nunito text-[#222F3E] group-hover:text-white">
                  {index !== 0 && <span className="text-lg">Starting at</span>} £{cardinfo?.price}{" "}
                    <span className="text-[14px]">
                      {cardinfo.type !== "Free" && `/${cardinfo.type}`}
                    </span>
                  </h2>
                  <h3 className="pt-8 xl:pt-10 text-[26px] xl:text-[32px] duration-300 transition-all font-semibold font-nunito text-[#222F3E] group-hover:text-[#fff]">
                    {cardinfo?.title}
                  </h3>
                  <p className="text-[#5A5C5F] font-poppins font-normal text-[16px] pt-4 pb-6 duration-300 transition-all group-hover:text-[#fff]">
                    {cardinfo?.description}
                  </p>
                </div>
                <div className="flex flex-col gap-y-2 flex-grow">
                  {cardinfo?.package_options.map((item, idx) => (
                    <div
                      className="flex gap-x-2 md:gap-x-3.5  xl:gap-x-5 items-center"
                      key={idx}
                    >
                      <Hoversvg className="group-hover:translate-y-0  duration-300  translate-y-10 group-hover:block hidden transition-all transform" />
                      <h5 className="text-[16px] duration-300 transition-all font-normal text-[#222F3E] group-hover:text-[#fff]">
                        {item.name}
                      </h5>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/checkout/${cardinfo.id}`}
                  className="flex w-full justify-center mt-5"
                >
                  <button disabled={subscriptionStatus?.package?.id === cardinfo?.id} className={`bg-[#007570] disabled:cursor-not-allowed   duration-300 transition-all cursor-pointer w-full  group-hover:bg-white group-hover:text-[#007570] py-3 md:py-4 xl:py-[19px] rounded-[8px] text-[#FFF] text-center font-semibold font-nunito flex justify-center text-nowrap`}>
                    {payLoad && cardinfo.id === activeId ? (
                      <Loader
                        className="animate-spin justify-center "
                        size={24}
                      />
                    ) : subscriptionStatus?.package_status && subscriptionStatus?.package?.id === cardinfo?.id ? 'Already Purchased ' : 'Choose Plan'
                    }
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Pricingcard;

const Hoversvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    fill="none"
    className="fill-[#007570] group-hover:fill-white size-6"
  >
    <path d="M12.832 2.5C18.352 2.5 22.832 6.98 22.832 12.5C22.832 18.02 18.352 22.5 12.832 22.5C7.31203 22.5 2.83203 18.02 2.83203 12.5C2.83203 6.98 7.31203 2.5 12.832 2.5ZM12.832 11.5H8.83203V13.5H12.832V16.5L16.832 12.5L12.832 8.5V11.5Z" />
  </svg>
);
