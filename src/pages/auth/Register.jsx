import { Eye, EyeOff, Loader, MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Icon from "../../assets/Images/Pricing/conmap.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import toast from "react-hot-toast";
import Container from "../../Shared/Container";

function Register() {
  const [isShow, setIsShow] = useState(true);
  const [isShow2, setIsShow2] = useState(true);
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const registerSchema = z
    .object({
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      email: z.string().email(),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirm_password: z.string(), // Add this field to the schema
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords must match",
      path: ["confirm_password"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await axiosCommon.post("/register", data);
      console.log(result.data);

      toast.success(result.data.message);
      localStorage.setItem("email", result.data.data.email);
      navigate("/otp");
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
            Register Your Account
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className="py-2">
              <input
                {...register("first_name")}
                placeholder="First Name"
                className="px-4 py-3 w-full rounded-md border border-primary01 "
                type="text"
                name="first_name"
              />
            </div>
            {errors.first_name && (
              <p className="text-xs text-red-400">
                {errors.first_name.message}
              </p>
            )}
            <div className="py-2">
              <input
                {...register("last_name")}
                placeholder="Last Name"
                className="px-4 py-3 w-full rounded-md border border-primary01 "
                type="text"
                name="last_name"
              />
            </div>
            {errors.last_name && (
              <p className="text-xs text-red-400">{errors.last_name.message}</p>
            )}
            <div className="py-2">
              <input
                {...register("email")}
                placeholder="Email"
                className="px-4 py-3 w-full rounded-md border border-primary01 "
                type="email"
                name="email"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
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
            <div className="py-2 relative">
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
                {...register("confirm_password")}
                placeholder="Confirm Password"
                className="px-4 py-3 w-full rounded-md border border-primary01 "
                type={isShow2 ? "password" : "text"}
                name="confirm_password"
              />
            </div>
            {errors.confirm_password && (
              <p className="text-sm text-red-400">
                {errors.confirm_password.message}
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
                    "Register"
                  )}{" "}
                </p>
              </button>
            </div>
            <h4 className="flex items-center gap-2 pt-4">
              Already have an account{" "}
              <Link to={"/login"}>
                <p className="text-primary01 underline">Login</p>
              </Link>
            </h4>
          </form>
          <Link to={"/map"} className=" ">
            <h4 className="px-8 py-3 mt-4 md:mt-8 bg-primary01 text-white flex justify-center gap-2 rounded-md">
              <MoveLeft /> Back
            </h4>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Register;
