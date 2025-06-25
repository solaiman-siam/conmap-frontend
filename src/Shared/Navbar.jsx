import React, { useState, useEffect, useContext } from "react";
import Container from "../Shared/Container";
import Conmap from "../Assets/Images/Pricing/conmap.png";
import ConmapGreen from "../Assets/Images/Pricing/conmap-green.png";
import { Link } from "react-router";
import { Dropdown, Space, Typography } from "antd";
import { MdMenu } from "react-icons/md";
import RemainingTimeCountDown from "../Components/Reusablecomponents/RemainingTimeCountDown";
import useAxiosSecure from "../hooks/api-hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { globalSwal } from "../utils/swal";
import { MainContext } from "../context/StateContext/StateContext";
import { set } from "react-hook-form";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isToken, setIsToken, setIsRightBarOpen, setProjectId } =
    useContext(MainContext);

  const items = [
    {
      key: "1",
      label: <a href="/register">Sign Up</a>,
    },
    {
      key: "2",
      label: <a href="/pricing">Upgrade To Premium</a>,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Adjust the scroll distance as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const axiosSecure = useAxiosSecure();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        ...globalSwal,
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout",
      });

      if (result.isConfirmed) {
        const result = await axiosSecure.post("/logout");
        console.log(result.data);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
      }
    } catch (err) {
      toast.error(err.response.data.message, "dkfgjhg");
    }
  };

  return (
    <div className="absolute top-0 z-50 w-full">
      <div className="py-2 md:py-3 lg:py-4 xl:py-5"></div>
      <nav
        className={`w-full py-2 ${
          isScrolled ? "fixed top-0 left-0 bg-white shadow-lg z-50" : ""
        }`}
      >
        <Container className="">
          <div className="flex justify-between items-center">
            <div className="">
              <img
                src={isScrolled ? ConmapGreen : Conmap}
                alt="conmap"
                className="w-20 md:w-24 lg:w-[105px]"
              />
            </div>
            <div className="gap-x-5 items-center hidden md:flex">
              {token && (
                <div className="hidden lg:block mr-4">
                  <RemainingTimeCountDown isScrolled={isScrolled} />
                </div>
              )}
              {token ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="lg:text-[18px] text-[#FFF] text-center font-nunito font-semibold px-8 py-3 h-fit bg-[#007570] rounded-[10px] cursor-pointer text-nowrap"
                  >
                    Logout
                  </button>

                  <Link
                    to={"/pricing"}
                    className="lg:text-[18px] text-[#FFF] text-center font-nunito font-semibold px-8 py-3 bg-[#007570] rounded-[10px] cursor-pointer text-nowrap"
                  >
                    Upgrade To Premium
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="lg:text-[18px] text-[#FFF] text-center font-nunito font-semibold px-8 py-4 bg-[#007570] rounded-[10px] cursor-pointer text-nowrap"
                >
                  Sign In
                </Link>
              )}
              {!token ? (
                <Link
                  to={"/pricing"}
                  className="lg:text-[18px] text-[#FFF] text-center font-nunito font-semibold px-8 py-4 bg-[#007570] rounded-[10px] cursor-pointer text-nowrap"
                >
                  Upgrade To Premium
                </Link>
              ) : null}
            </div>
            <div className="md:hidden">
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                }}
              >
                <Typography.Link>
                  <Space className="bg-[#007570] rounded-[10px] p-2">
                    <MdMenu className="size-8 text-white" />
                  </Space>
                </Typography.Link>
              </Dropdown>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
