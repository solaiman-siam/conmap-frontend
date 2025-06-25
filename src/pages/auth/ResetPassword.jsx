import Icon from "../../assets/Images/Pricing/conmap.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Eye, EyeOff, Loader, MoveLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import Container from "../../Shared/Container";

function ResetPassword() {
  const [isShow, setIsShow] = useState(true);
  const [isShow2, setIsShow2] = useState(true);
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const resetPassSchema = z
    .object({
      password: z.string().min(8, "Password must be at least 8 characters"),
      password_confirmation: z.string(), // Add this field to the schema
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords must match",
      path: ["password_confirmation"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resetPassSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const result = await axiosCommon.post("/reset-password", {
        ...data,
        email: email,
        token: token,
      });
      toast.success(result.data.message);
      navigate("/login");
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
            Update your password
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 relative">
              {!isShow && (
                <Eye
                  size={20}
                  onClick={() => setIsShow(true)}
                  className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2"
                />
              )}
              {isShow && (
                <EyeOff
                  size={20}
                  onClick={() => setIsShow(false)}
                  className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2"
                />
              )}
              <input
                {...register("password")}
                placeholder="Password"
                className="px-4 py-3 w-full rounded-md border border-primary01 "
                type={isShow ? "password" : "text"}
                name="password"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
            <div className=" relative">
              {!isShow2 && (
                <Eye
                  size={20}
                  onClick={() => setIsShow2(true)}
                  className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2"
                />
              )}
              {isShow2 && (
                <EyeOff
                  size={20}
                  onClick={() => setIsShow2(false)}
                  className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2"
                />
              )}
              <input
                {...register("password_confirmation")}
                placeholder="Confirm Password"
                className="px-4 py-3 w-full rounded-md border border-primary01 "
                type={isShow2 ? "password" : "text"}
                name="password_confirmation"
              />
            </div>
            {errors.password_confirmation && (
              <p className="text-sm text-red-400">
                {errors.password_confirmation.message}
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
                    "Reset Password"
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
          <div className="pt-8"></div>
        </div>
      </Container>
    </div>
  );
}

export default ResetPassword;
