import Icon from "../../assets/Images/Pricing/conmap.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Eye, EyeOff, Loader, MoveLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import { MainContext } from "../../context/StateContext/StateContext";
import Container from "../../Shared/Container";
function ForgotPass() {
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const emailSchema = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const result = await axiosCommon.post("/forgot-password", data);
      toast.success(result.data.message);
      if (data.email) {
        localStorage.setItem("email", data.email);
      }
      navigate("/forgot-verify-otp");
      reset();
      setLoading(false);
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
            Enter your Email
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                placeholder="Enter  your email"
                className="w-full h-full px-4 py-3 rounded-md border "
                type="email"
                name="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 pt-1">
                {errors.email.message}
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
                    "Send Otp"
                  )}{" "}
                </p>
              </button>
            </div>
          </form>
          <Link to={"/login"} className=" ">
            <h4 className="px-8 py-3 mt-4 md:mt-8 bg-primary01 text-white flex justify-center gap-2 rounded-md">
              {" "}
              <MoveLeft /> Back
            </h4>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPass;
