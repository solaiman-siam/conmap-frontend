import { LogOut, MapPin, MoveLeft, PinIcon, Search } from "lucide-react";
import MapImage from "../../assets/Images/Pricing/conmap.png";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/api-hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { globalSwal } from "../../utils/swal";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/StateContext/StateContext";
import Home from "../../Assets/Images/icon/map_pin.png";
import { IoFilterSharp } from "react-icons/io5";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { CrossIcon } from "../../Assets/Images/icon/Icon";
import RightProductDetails from "../../components/map/RightProductDetails";
import ProductsListView from "../../components/map/ProductsListView";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import LoadingSpinner2 from "../../components/LoadingSpinner2";
import { Slider } from "antd";

function MapPage() {
  const axiosSecure = useAxiosSecure();
  const {
    isToken,
    setIsToken,
    sByProject,
    setSByProject,
    sByAddress,
    setSByAddress,
    sByClient,
    setSByClient,
    sByLocalAuthority,
    setSByLocalAuthority,
    currentLat,
    setCurrentLat,
    currentLong,
    setCurrentLong,
    radius,
    setRadius,
  } = useContext(MainContext);
  const [listView, setListView] = useState(false);
  const [pinnedView, setPinnedView] = useState(false);
  const axiosCommon = useAxiosCommon();
  const [isRange, setIsRange] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true);
    }
  }, [setIsToken]);

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
        setIsToken(false);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const { data = [] } = useQuery({
    queryKey: [
      "projects",
      sByProject,
      sByAddress,
      sByClient,
      sByLocalAuthority,
      currentLat,
      currentLong,
      radius,
    ],
    queryFn: async () => {
      const res = await axiosCommon.get(
        `/project?search=${sByProject}&client_name=${sByClient}&local_authority=${sByLocalAuthority}&address=${sByAddress}&latitude=${currentLat}3&longitude=${currentLong}&location_radius=${radius}`
      );

      return res?.data?.data?.map((item) => {
        return {
          lat: Number(item?.latitude),
          lng: Number(item?.longitude),
          id: item?.id,
        };
      });
    },
  });

  const handleSearchByProject = (e) => {
    const searchTerm = e.target.value;
    setSByProject(searchTerm);

    setSByAddress("");
    setSByClient("");
    setSByLocalAuthority("");
    setIsRange(true);
    setIsChecked(false);
  };

  const handleSearchByAddress = (e) => {
    const searchTerm = e.target.value;
    setSByAddress(searchTerm);

    setSByProject("");
    setSByClient("");
    setSByLocalAuthority("");
    setIsRange(true);
    setIsChecked(false);
  };

  const handleSearchByClient = (e) => {
    const searchTerm = e.target.value;
    setSByClient(searchTerm);

    setSByAddress("");
    setSByProject("");
    setSByLocalAuthority("");
    setIsRange(true);
    setIsChecked(false);
  };

  const handleSearchByLocalAuthority = (e) => {
    const searchTerm = e.target.value;
    setSByLocalAuthority(searchTerm);

    setSByAddress("");
    setSByProject("");
    setIsRange(true);
    setSByClient("");
    setIsChecked(false);
  };

  // const [disabled, setDisabled] = useState(false);
  // const onChange = checked => {

  // };

  const handleRadiusRange = (radius) => {
    // const radius = e.target.value;
    console.log(radius);
    if (currentLat !== "" || currentLong !== "") {
      setRadius(radius);

      setSByAddress("");
      setSByProject("");
      setSByLocalAuthority("");
      setSByClient("");
      setIsRange(true);
      setIsChecked(false);
    }
  };

  const handleRangeCheckbox = (e) => {
    if (e.target.checked) {
      setIsChecked(e.target.checked);
      console.log("log");
      setIsRange(false);
      setSByAddress("");
      setSByProject("");
      setSByLocalAuthority("");
      setSByClient("");
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLat(String(latitude));
        setCurrentLong(String(longitude));
        setRadius(4);
        console.log(latitude, longitude);
      });
    } else {
      setRadius("");
      setCurrentLat("");
      setCurrentLong("");
      setIsRange(true);
      setIsChecked(false);
    }
  };

  const handleClearFilter = () => {
    setRadius("");
    setCurrentLat("");
    setCurrentLong("");
    setSByAddress("");
    setSByProject("");
    setSByLocalAuthority("");
    setSByClient("");
    setIsRange(true);
    setIsChecked(false);
  };

  console.log(isRange);

  const [leftBarOpen, setLeftBarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setLeftBarOpen(window.innerWidth > 767 ? true : false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <div className="h-screen mapPage relative overflow-hidden">
      <Link to={"/"}>
        <button className="px-4 py-2 bg-primary01 text-white absolute top-4 left-5 cursor-pointer z-[88]  my-2 flex items-center gap-3 rounded-lg">
          <MoveLeft /> <span className="lg:block hidden">Back to Home</span>
        </button>
      </Link>
      <div
        className={`transition-opacity duration-300 ${
          listView ? "opacity-0 lg:opacity-100" : "opacity-100"
        }`}
      >
        {leftBarOpen ? (
          <div className="p-2 md:p-4 z-[8] rounded-2xl bg-[#81C1B5] absolute top-20 left-5 max-w-[85vw] h-fit">
            <div
              className=" absolute top-0 right-0 cursor-pointer bg-[#81C1B5] p-2.5 rounded-md rounded-tr-3xl lg:hidden"
              onClick={() => setLeftBarOpen(false)}
            >
              <CrossIcon fill="fill-white" />
            </div>
            <div className="bg-white md:w-[320px] p-3 md:p-4 rounded-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex pb-6 items-center gap-4">
                <div className="bg-[#007570] p-2 rounded-2xl flex-shrink-0">
                  <img className="w-12" src={MapImage} alt="icon" />
                </div>
                <h3 className="text-lg font-semibold">Constructor Map Site</h3>
              </div>

              <div className=" rounded-2xl border border-black/50 overflow-hidden">
                <div className="flex text-white p-2 rounded-t-lg bg-primary01  items-center gap-4">
                  <Search />
                  <h4>Search map markers</h4>
                </div>
                <input
                  onChange={handleSearchByProject}
                  placeholder="Search By Project"
                  className="w-full text-sm py-2 px-4 focus:outline-none border-primary01"
                  type="text"
                  value={sByProject}
                  name=""
                  id=""
                />
              </div>
              <div className=" mt-4  rounded-2xl border border-black/50 overflow-hidden">
                <div className="flex justify-start  text-white p-2 rounded-t-lg bg-primary01  items-center gap-4">
                  <MapPin />
                  <h4 className="text-left">Filter map markers</h4>
                </div>
                <div className="w-full flex py-2 justify-center items-center">
                  <button
                    onClick={handleClearFilter}
                    className="text-center px-4 cursor-pointer text-sm rounded-sm border w-fit  flex justify-center hover:underline"
                  >
                    Clear All filters
                  </button>
                </div>
              </div>
              <div className="border rounded-md p-2 mt-4">
                <div className="flex items-center gap-2 ">
                  <input
                    onChange={handleRangeCheckbox}
                    checked={isChecked}
                    className="appearance-none relative w-4 h-4 border rounded-xs bg-white checked:bg-primary01 checked:after:content-['✔'] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-white checked:after:text-sm"
                    type="checkbox"
                    id="radius"
                  />
                  <label htmlFor="radius">Location radius filter</label>
                </div>

                <div className="flex items-center pt-2 gap-2">
                  <label className="text-nowrap" htmlFor="">
                    Range
                  </label>
                  {/* <h4 className="text-black">{radius}</h4> */}
                  <Slider
                    className="w-full"
                    onChange={handleRadiusRange}
                    disabled={isRange}
                    defaultValue={10}
                  />
                </div>
              </div>
              <div className="flex px-2 mt-4  gap-4 border rounded-md p-1.5">
                <input
                  onChange={handleSearchByAddress}
                  placeholder="Search by address"
                  className="focus:outline-none text-sm px-2 w-full"
                  type="text"
                  value={sByAddress}
                  name=""
                  id=""
                />
              </div>
              <div className="flex px-2 mt-2 gap-4 border rounded-md p-1.5">
                <input
                  onChange={handleSearchByClient}
                  placeholder="Search by client"
                  className="focus:outline-none text-sm px-2 w-full "
                  type="text"
                  name=""
                  value={sByClient}
                  id=""
                />
              </div>

              <div className="flex px-2 mt-2  gap-4 border rounded-md p-1.5">
                <input
                  onChange={handleSearchByLocalAuthority}
                  placeholder="Search by local authority"
                  className="focus:outline-none text-sm px-2 w-full "
                  type="text"
                  value={sByLocalAuthority}
                  name=""
                  id=""
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setPinnedView(true);
                    setListView(false);
                  }}
                  className="px-4 py-2 flex cursor-pointer items-center gap-2 justify-center w-full bg-primary01 text-white rounded-lg"
                >
                  <PinIcon size={20} /> Pinned Projects
                </button>
              </div>
              <div className="flex mt-4 items-center">
                <div
                  onClick={() => {
                    setListView(false);
                    setPinnedView(false);
                  }}
                  className="flex  hover:bg-white p-2 transition-all duration-300 flex-1 cursor-pointer justify-center  items-center bg-[#CCE3E2] flex-col gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M9.32102 0.599796C5.22422 0.570996 1.89062 3.8854 1.89062 7.9798C1.89062 14.083 6.33782 18.5782 8.32743 20.2894C8.84822 20.7334 9.69303 20.7358 10.2138 20.2894C10.437 20.095 10.6986 19.8646 10.9794 19.5982C9.11702 17.167 9.29702 13.663 11.5194 11.4406C12.693 10.267 14.253 9.6214 15.9114 9.6214C16.1202 9.6214 16.329 9.631 16.5354 9.6502C16.581 9.3238 16.6122 8.9902 16.629 8.6542C16.8594 4.3798 13.605 0.630996 9.32102 0.599796ZM9.27062 11.491C7.33383 11.491 5.75943 9.919 5.75943 7.9798C5.75943 6.0382 7.33383 4.4662 9.27062 4.4662C11.2098 4.4662 12.7818 6.0382 12.7818 7.9798C12.7818 9.919 11.2098 11.491 9.27062 11.491Z"
                      fill="#007570"
                    />
                    <path
                      d="M15.9122 20.8365C14.6296 20.8365 13.347 20.3484 12.3707 19.372C10.4181 17.4192 10.4181 14.2418 12.3707 12.2892C12.8347 11.8226 13.3866 11.4528 13.9945 11.201C14.6024 10.9492 15.2542 10.8205 15.9122 10.8223C17.2499 10.8223 18.5075 11.3431 19.4536 12.2892C19.9201 12.7531 20.29 13.305 20.5418 13.9129C20.7936 14.5208 20.9223 15.1726 20.9205 15.8306C20.9223 16.4885 20.7936 17.1403 20.5418 17.7481C20.29 18.356 19.9201 18.9079 19.4536 19.3718C18.4773 20.3484 17.1947 20.8365 15.9122 20.8365ZM15.9122 12.3427C15.454 12.3414 15.0001 12.4311 14.5768 12.6064C14.1534 12.7817 13.7691 13.0393 13.4459 13.3641C12.0861 14.7242 12.0861 16.937 13.4459 18.2968C14.8058 19.6567 17.0186 19.6564 18.3784 18.2968C19.0372 17.638 19.4001 16.762 19.4001 15.8306C19.4001 14.8992 19.0372 14.0232 18.3784 13.3644C18.0553 13.0395 17.671 12.7819 17.2476 12.6065C16.8243 12.4311 16.3704 12.3415 15.9122 12.3427Z"
                      fill="#007570"
                    />
                    <path
                      d="M22.7219 23.4005C22.5275 23.4005 22.3331 23.3261 22.1843 23.1778L18.3788 19.3719C18.3083 19.3013 18.2523 19.2175 18.2141 19.1253C18.1759 19.033 18.1562 18.9342 18.1563 18.8343C18.1563 18.7345 18.1759 18.6356 18.2141 18.5434C18.2524 18.4512 18.3084 18.3674 18.379 18.2968C18.4496 18.2262 18.5334 18.1702 18.6256 18.1321C18.7178 18.0939 18.8167 18.0742 18.9165 18.0742C19.1181 18.0742 19.3115 18.1544 19.454 18.2969L23.2595 22.1029C23.3658 22.2092 23.4383 22.3446 23.4676 22.4921C23.497 22.6396 23.4819 22.7924 23.4244 22.9314C23.3668 23.0703 23.2694 23.189 23.1443 23.2725C23.0193 23.356 22.8723 23.4006 22.7219 23.4005Z"
                      fill="#007570"
                    />
                  </svg>
                  <h4>Map view</h4>
                </div>
                <div
                  onClick={() => {
                    setListView(true);
                    setPinnedView(false);
                  }}
                  className="flex flex-1 hover:bg-white p-2 justify-center transition-all duration-300 cursor-pointer items-center bg-[#CCE3E2] flex-col gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M2.4375 3.44336H4.93125V5.93711H2.4375V3.44336Z"
                      fill="#007570"
                    />
                    <path
                      d="M2.43792 3.91253H4.93167L4.46292 3.44378V5.93753L4.93167 5.46878H2.43792L2.90667 5.93753V3.44378C2.90667 3.19769 2.69105 2.96331 2.43792 2.97503C2.1848 2.98675 1.96917 3.18128 1.96917 3.44378V5.93753C1.96917 6.19066 2.1848 6.40628 2.43792 6.40628H4.93167C5.1848 6.40628 5.40042 6.19066 5.40042 5.93753V3.44378C5.40042 3.19066 5.1848 2.97503 4.93167 2.97503H2.43792C2.19183 2.97503 1.95745 3.19066 1.96917 3.44378C1.97855 3.69691 2.17308 3.91253 2.43792 3.91253ZM7.87542 5.62816H19.9832C20.5434 5.62816 21.1035 5.63519 21.6637 5.62816H21.6871C22.177 5.62816 22.6481 5.19691 22.6246 4.69066C22.6012 4.18206 22.2121 3.75316 21.6871 3.75316H9.57933C9.01917 3.75316 8.45902 3.74612 7.89886 3.75316H7.87542C7.38558 3.75316 6.91448 4.18441 6.93792 4.69066C6.96136 5.19691 7.35042 5.62816 7.87542 5.62816ZM2.43792 10.7539H4.93167V13.2477H2.43792V10.7539Z"
                      fill="#007570"
                    />
                    <path
                      d="M2.43792 11.2231H4.93167L4.46292 10.7543V13.2481L4.93167 12.7793H2.43792L2.90667 13.2481V10.7543C2.90667 10.5082 2.69105 10.2739 2.43792 10.2856C2.1848 10.2973 1.96917 10.4918 1.96917 10.7543V13.2481C1.96917 13.5012 2.1848 13.7168 2.43792 13.7168H4.93167C5.1848 13.7168 5.40042 13.5012 5.40042 13.2481V10.7543C5.40042 10.5012 5.1848 10.2856 4.93167 10.2856H2.43792C2.19183 10.2856 1.95745 10.5012 1.96917 10.7543C1.97855 11.0075 2.17308 11.2231 2.43792 11.2231ZM7.87542 12.9387H19.9832C20.5434 12.9387 21.1035 12.9457 21.6637 12.9387H21.6871C22.177 12.9387 22.6481 12.5075 22.6246 12.0012C22.6012 11.4926 22.2121 11.0637 21.6871 11.0637H9.57933C9.01917 11.0637 8.45902 11.0567 7.89886 11.0637H7.87542C7.38558 11.0637 6.91448 11.495 6.93792 12.0012C6.96136 12.5098 7.35042 12.9387 7.87542 12.9387ZM2.43792 18.0645H4.93167V20.5582H2.43792V18.0645Z"
                      fill="#007570"
                    />
                    <path
                      d="M2.43792 18.5336H4.93167L4.46292 18.0649V20.5586L4.93167 20.0899H2.43792L2.90667 20.5586V18.0649C2.90667 17.8188 2.69105 17.5844 2.43792 17.5961C2.1848 17.6078 1.96917 17.8024 1.96917 18.0649V20.5586C1.96917 20.8117 2.1848 21.0274 2.43792 21.0274H4.93167C5.1848 21.0274 5.40042 20.8117 5.40042 20.5586V18.0649C5.40042 17.8117 5.1848 17.5961 4.93167 17.5961H2.43792C2.19183 17.5961 1.95745 17.8117 1.96917 18.0649C1.97855 18.3203 2.17308 18.5336 2.43792 18.5336ZM7.87542 20.2493H19.9832C20.5434 20.2493 21.1035 20.2563 21.6637 20.2493H21.6871C22.177 20.2493 22.6481 19.818 22.6246 19.3118C22.6012 18.8032 22.2121 18.3743 21.6871 18.3743H9.57933C9.01917 18.3743 8.45902 18.3672 7.89886 18.3743H7.87542C7.38558 18.3743 6.91448 18.8055 6.93792 19.3118C6.96136 19.8203 7.35042 20.2493 7.87542 20.2493Z"
                      fill="#007570"
                    />
                  </svg>
                  <h4>List View</h4>
                </div>
              </div>

              {isToken && (
                <div className="pt-8">
                  <button
                    onClick={handleLogout}
                    className="w-full flex justify-center cursor-pointer items-center gap-2 py-2.5 bg-primary01 text-white"
                  >
                    <LogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="bg-[#007570] rounded-[10px] p-2 absolute top-20 left-5 z-20 flex items-center gap-3"
            onClick={() => setLeftBarOpen(true)}
          >
            <IoFilterSharp className="size-7 text-white" />
            <p className="text-white font-medium">Filter</p>
          </div>
        )}
      </div>

      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <div className="w-full relative z-[2] h-screen object-cover">
          <Map
            defaultCenter={{ lat: 51.5072, lng: 0.1276 }} // Center of the UK
            defaultZoom={7}
            options={{
              restriction: {
                latLngBounds: {
                  north: 85,
                  south: -85,
                  west: -180,
                  east: 180,
                },
                strictBounds: true,
              },
              disableDefaultUI: false, // Allows zoom controls
              scrollwheel: true, // Keeps scroll working
            }}
            mapId={import.meta.env.VITE_PUB_MAP_ID}
          >
            <Markers pins={data}></Markers>
          </Map>
        </div>
      </APIProvider>
      {listView && (
        <ProductsListView listView={listView} setListView={setListView} />
      )}
      {pinnedView && (
        <ProductsListView
          pinnedView={pinnedView}
          setPinnedView={setPinnedView}
        />
      )}
      <RightProductDetails />
    </div>
  );
}

export default MapPage;

const Markers = ({ pins }) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const axiosCommon = useAxiosCommon();

  const handleInfo = async (bool, index) => {
    setInfoOpen(bool);
    setIsActive(index);
  };

  const { data: windowInfo = {}, isLoading } = useQuery({
    queryKey: ["windowInfo", isActive],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/project/${isActive + 1}`);
      return data?.data;
    },
  });

  const { setIsRightBarOpen, setProjectId } = useContext(MainContext);

  return (
    <>
      {pins?.map((location, index) => (
        <AdvancedMarker
          onClick={() => handleInfo(true, index)}
          key={index}
          position={location}
        >
          <span className="text-lg">
            <img className="w-10 h-10" src={Home} alt="" />{" "}
          </span>
          {infoOpen && index === isActive && (
            <InfoWindow
              className=" w-80 "
              onCloseClick={() => handleInfo(false, index)}
              position={location}
            >
              {isLoading ? (
                <LoadingSpinner2 isLoading={isLoading} />
              ) : (
                <div className="">
                  <h3 className="pl-4 pr-10 py-2 bg-[#00B4B4] mb-2 text-white font-medium text-base ">
                    {windowInfo?.name}
                  </h3>
                  <p className=" !text-xs pl-4">{windowInfo?.client_name}</p>
                  <p className=" !text-xs pl-4 pt-px ">
                    {windowInfo?.project_build_type}
                  </p>
                  <p className=" !text-xs pl-4 pt-px pb-2">
                    {windowInfo?.local_authority}
                  </p>

                  <button
                    onClick={() => {
                      setIsRightBarOpen(true);
                      setProjectId(location?.id);
                    }}
                    className="px-4 w-full font-medium text-xs  cursor-pointer hover:underline border-gray-400  py-3 border bg-[#F2F2F2]"
                  >
                    Click here for site info
                  </button>
                </div>
              )}
            </InfoWindow>
          )}
        </AdvancedMarker>
      ))}
    </>
  );
};
