
import useAxiosSecure from "../../hooks/api-hooks/useAxiosSecure";
import { Link } from "react-router";
import { ChevronLeft, Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../../Shared/Container";
import { useForm } from "react-hook-form";

function CheckoutForm({ id }) {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const onSubmit = async(data) => {
    setLoading(true)
    try{
      const result = await axiosSecure.post(`/send-mail/${id}`, data);
      console.log(result.data);
      toast.success(result?.data?.message)
      reset()
      setLoading(false)
    }catch(error) {
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  };


  return (
    <div className="flex  h-screen items-center" >

     
      <Container>
        <div className="flex px-24  flex-col-reverse md:flex-row items-center gap-4 lg:gap-10">
       
          <div className="flex-1 relative flex-shrink-0 w-full">
          <Link to={'/pricing'} className="absolute  -top-12 left-0">
        <button className="px-4 py-2 bg-primary01 cursor-pointer text-white rounded-lg flex items-center gap-2"> <ChevronLeft /> Back to Home</button>
      </Link>
            <figure className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[700px] overflow-hidden rounded-lg group border-4 border-primary01/20">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
                src="https://i.ibb.co.com/NdRDLZMq/Image20250503164542.png"
                alt="map_image"
              />
            </figure>
          </div>
          <div className="flex-1 relative flex-shrink-0 w-full">
          
            {/* <div className="w-fit pb-4 justify-start items-start">
              <img
                className="p-2 mx-auto rounded-lg bg-primary01 w-20 md:w-24"
                src={Icon}
                alt=""
              />
            </div> */}
            <h3 className="text-xl xl:text-2xl text-primary01 font-semibold md:max-w-[400px] mb-5 lg:mb-10">
              Please complete the form below
            </h3>
            {/* <CardElement className="w-full md:max-w-[500px] font-medium rounded-lg bg-white border p-4 border-primary01/40" /> */}
            <div className="flex gap-2 md:gap-3 lg:gap-4 pt-4">
              {/* <Link
                to={"/pricing"}
                className="font-medium cursor-pointer rounded-md text-white  bg-primary01 w-12 aspect-square flex justify-center items-center"
              >
                <ChevronLeft />
              </Link> */}

              <form
              onSubmit={handleSubmit(onSubmit)}
                action=""
                className=" w-full grid-cols-2 grid gap-4 space-y-2"
              >
                <div className="flex col-span-1 flex-col gap-2">
                  <label htmlFor="">First Name</label>
                  <input
                    className="border border-black/20 px-4 py-2 rounded-lg"
                    type="text"
                    name="first_name"
                    id=""
                    placeholder="First Name"
                    {...register("first_name", { required: true })}
                  />
                  {errors.first_name && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div className="flex col-span-1 flex-col gap-2">
                  <label htmlFor="">Last Name</label>
                  <input
                    className="border border-black/20 px-4 py-2 rounded-lg"
                    type="text"
                    name="last_name"
                    id=""
                    placeholder="Last Name"
                    {...register("last_name", { required: true })}
                  />
                  {errors.first_name && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div className="flex col-span-1 flex-col gap-2">
                  <label htmlFor="">Email</label>
                  <input
                    className="border border-black/20 px-4 py-2 rounded-lg"
                    type="email"
                    name="email"
                    id=""
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div className="flex col-span-1 flex-col gap-2">
                  <label htmlFor="">Telephone No.</label>
                  <input
                    className="border border-black/20 px-4 py-2 rounded-lg"
                    type="number"
                    name="telephone_number"
                    id=""
                    placeholder="Enter your telephone"
                    {...register("telephone_number")}
                  />
                </div>
                <div className="flex flex-col col-span-2 gap-2">
                  <label htmlFor="">Company Name</label>
                  <input
                    className="border border-black/20 px-4 py-2 rounded-lg"
                    type="text"
                    name="company_name"
                    id=""
                    placeholder="Enter your company name"
                    {...register("company_name")}
                  />
                </div>
                <div className="flex col-span-2 flex-col gap-2">
                  <label htmlFor="">Message</label>
                  <textarea
                    className="h-40  px-4 py-2 rounded-lg border border-black/20"
                    name="message"
                    id=""
                    placeholder="Write your words here..."
                    {...register("message")}
                  ></textarea>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="lg:w-full w-full bg-primary01 flex justify-center items-center text-white rounded-md"
                  >
                    <p className="text-white w-full flex justify-center items-center px-4 py-3 font-medium cursor-pointer">
                      {" "}
                      {loading ? (
                        <Loader className="animate-spin" size={24} />
                      ) : (
                        "Submit"
                      )}{" "}
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CheckoutForm;
