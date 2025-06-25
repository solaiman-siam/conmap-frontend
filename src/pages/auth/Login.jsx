import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Eye, EyeOff, Loader, MoveLeft } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import { MainContext } from "../../context/StateContext/StateContext";
import Icon from "../../assets/Images/Pricing/conmap.png";
import Container from "../../Shared/Container";

function Login() {
  const [isShow, setIsShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  const { setIsToken } = useContext(MainContext);

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const result = await axiosCommon.post("/login", data);

      toast.success(result.data.message);
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        setIsToken(true);
      }
      navigate("/map");
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
            Login To Your Account
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} action="">
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
              <p className="text-xs text-red-400">{errors.email.message}</p>
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
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
            <Link
              to="/forgot-password"
              className="hover:underline text-right w-full cursor-pointer"
            >
              Forgot Password
            </Link>

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
                    "Login"
                  )}{" "}
                </p>
              </button>
            </div>

            <h4 className="flex flex-wrap gap-x-2 pt-4">
              Don’t have an account?{" "}
              <Link to={"/register"}>
                {" "}
                <p className="text-primary01 hover:underline">
                  Register an Account
                </p>
              </Link>
            </h4>
          </form>
          <Link to={"/map"} className=" ">
            <h4 className="px-8 py-3 mt-4 md:mt-8 bg-primary01 text-white flex justify-center gap-2 rounded-md">
              {" "}
              <MoveLeft /> Back
            </h4>
          </Link>
          {/* <div className="pt-8">
          <button className="px-4 py-2 rounded-lg bg-primary01 text-white ">
            Google Login
          </button>
        </div> */}
        </div>
      </Container>
    </div>
  );
}

export default Login;
