import { useContext, useState } from "react";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import { z } from "zod";
import Icon from "../../assets/Images/Pricing/conmap.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader, MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { MainContext } from "../../context/StateContext/StateContext";
import Container from "../../Shared/Container";

function ForgotVerifyOtp() {
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  const { setIsToken } = useContext(MainContext);
  const email = localStorage.getItem("email");

  const otpSchema = z.object({
    otp: z.string().min(1, "OTP is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await axiosCommon.post("/forgot-verify-otp", {
        ...data,
        email: email,
      });
      toast.success(result.data.message);
      console.log(result.data);
      reset();
      setLoading(false);
      if (result.data.data.token) {
        localStorage.setItem("token", result.data.data.token);
        setIsToken(true);
      }
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Container>
        <div className="max-w-[500px] w-full mx-auto">
          <div className="w-full pb-0 justify-center items-center">
            <img
              className="p-2 w-24 mx-auto rounded-lg bg-primary01 "
              src={Icon}
              alt=""
            />
          </div>
          <h4 className="pt-4 lg:pt-8 text-xl lg:text-2xl text-center pb-6 lg:pb-12 font-semibold">
            Check Email and Verify Your Otp
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div>
              <div>
                <input
                  placeholder="Verify Otp"
                  className="w-full py-3 rounded-md border border-primary01 px-4"
                  type="text"
                  {...register("otp")}
                  name="otp"
                  id=""
                />
              </div>
              {errors.otp && (
                <p className="text-red-400 text-xs pt-1">
                  {errors.otp.message}
                </p>
              )}
              <div className="py-4">
                <button
                  disabled={isSubmitting}
                  className="w-full bg-primary01 flex justify-center items-center text-white py-3 rounded-md"
                >
                  <p className="text-white font-medium cursor-pointer">
                    {" "}
                    {loading ? (
                      <Loader className="animate-spin" size={24} />
                    ) : (
                      "Confirm Otp"
                    )}{" "}
                  </p>
                </button>
              </div>
            </div>
          </form>
          <Link to={"/login"} className=" ">
            <h4 className="px-8 py-3 mt-4 md:mt-8 bg-primary01 text-white flex justify-center gap-2 rounded-md">
              <MoveLeft /> Back
            </h4>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default ForgotVerifyOtp;
