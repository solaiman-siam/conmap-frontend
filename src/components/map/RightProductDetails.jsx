import React, { useContext, useState } from "react";
import {
  CrossIcon,
  HomeMapIcon,
  MapIcon,
  SatelliteIcon,
} from "../../Assets/Images/icon/Icon";
import { MainContext } from "../../context/StateContext/StateContext";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import parse from "html-react-parser";
import { Image } from "antd";
import { Loader, MapPlus } from "lucide-react";
import useAxiosSecure from "../../hooks/api-hooks/useAxiosSecure";
import toast from "react-hot-toast";
import HomeIcon from "../../Assets/Images/icon/map_pin.png";
import UpgradePlan from "./UpgradePlan";
const RightProductDetails = () => {
  const [activeBtn, setActiveBtn] = useState("Map");
  const { projectId } = useContext(MainContext);
  const { isRightBarOpen, setIsRightBarOpen } = useContext(MainContext);
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [activeIndex, setActiveIndex] = useState(0);

  console.log("projectId", projectId);

  const { data: details = {} } = useQuery({
    queryKey: ["project-list", projectId],
    queryFn: async () => {
      const res = await axiosCommon.get(`/project/${projectId}`);
      console.log("data", res?.data);
      console.log(res.data.data);
      return res.data.data;
    },
    enabled: !!projectId,
  });

  const tabs = ["Project Info", "Contact", "Notes", "Links", "Images"];

  const addPinProject = async (newProject) => {
    const result = await axiosSecure.post("/project-pin/store", newProject);
    return result.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addPinProject,
    onSuccess: () => {
      console.log("pin added succesfully");
      toast.success("project added successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
      console.log();
    },
  });

  const handleToAddPinned = () => {
    mutate({ project_id: projectId });
  };

  console.log(details);

  // get subscription status

  const [subscriptionStatus, setSubscriptionStatus] = useState(false);

  const { data: subscriptionData = {} } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user-subscription-check");
      setSubscriptionStatus(res?.data?.data?.package_status);
      console.log("packageInfo", res?.data?.data);
      return res.data;
    },
  });

  return (
    <>
      <div
        className={`p-2 md:p-4  z-30 rightDetails  rounded-2xl bg-[#81C1B5] absolute top-5 right-5 transition-all duration-1000  ${
          isRightBarOpen ? "" : "translate-x-[500px]"
        }`}
      >
        <div
          className=" absolute top-0 right-0 cursor-pointer bg-[#81C1B5] p-2.5 md:p-4 rounded-md rounded-tr-3xl z-10"
          onClick={() => setIsRightBarOpen(false)}
        >
          <CrossIcon fill="fill-white" />
        </div>
        <div className="bg-white w-[400px] max-w-[85vw] py-4 rounded-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="flex items-center gap-2 mb-4 px-4">
            <HomeMapIcon className="-translate-x-1.5" />
            <div className="flex-1">
              <h3 className="text-[#0D0E10] font-medium">Registered Site</h3>
              <h4 className="text-[#007570] font-semibold">
                Villiers Square Redevelopment
              </h4>
            </div>
          </div>
          <div className="relative">
            {
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
                <div className="w-full relative z-[2] h-[200px] object-cover">
                  <Map
                    mapId={import.meta.env.VITE_PUB_MAP_ID}
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
                      scrollwheel: false, // Keeps scroll working
                    }}
                    position={{
                      lat: details?.latitude,
                      lng: details?.longitude,
                    }}
                  >
                    {details?.latitude !== undefined &&
                      details?.longitude !== undefined &&
                      !isNaN(Number(details.latitude)) &&
                      !isNaN(Number(details.longitude)) && (
                        <AdvancedMarker
                          defaultZoom={10}
                          center={{
                            lat: details?.latitude,
                            lng: details?.longitude,
                          }}
                          position={{
                            lat: Number(details.latitude),

                            lng: Number(details.longitude),
                          }}
                        >
                          {" "}
                          <span className="text-lg">
                            <img
                              className="w-10 h-10  "
                              src={HomeIcon}
                              alt=""
                            />{" "}
                          </span>{" "}
                        </AdvancedMarker>
                      )}
                  </Map>
                </div>
              </APIProvider>
            }
            <div className="w-fit bg-[#007570] flex gap-1 p-1 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-lg">
              <div
                className={`w-[110px] flex gap-2 justify-center items-center py-2 rounded-lg cursor-pointer ${
                  activeBtn === "Map" ? "bg-white" : "bg-transparent"
                }`}
                onClick={() => setActiveBtn("Map")}
              >
                <MapIcon
                  className={
                    activeBtn === "Map" ? "fill-[#007570]" : "fill-white"
                  }
                />
                <p
                  className={`}text-[#007570] text-sm font-semibold ${
                    activeBtn === "Map" ? "text-[#007570]" : "text-white"
                  }`}
                >
                  Map
                </p>
              </div>
              <button
                className={`w-[110px] flex gap-2 justify-center items-center py-2 rounded-lg cursor-pointer ${
                  activeBtn === "Satellite" ? "bg-white" : "bg-transparent"
                }`}
                onClick={() => setActiveBtn("Satellite")}
              >
                <SatelliteIcon
                  className={
                    activeBtn === "Satellite" ? "fill-[#007570]" : "fill-white"
                  }
                />
                <p
                  className={`}text-[#007570] text-sm font-semibold ${
                    activeBtn === "Satellite" ? "text-[#007570]" : "text-white"
                  }`}
                >
                  Satellite
                </p>
              </button>
            </div>
          </div>
          <div className="px-4 my-3 space-y-1">
            <div className="flex items-center justify-between w-full bg-gray-200 p-1  rounded-md ">
              {tabs.map((item, index) => (
                <h4
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`px-2 cursor-pointer text-xs text-black lg:text-sm  py-2 rounded-md ${
                    activeIndex === index ? "bg-primary01 text-white" : ""
                  }`}
                >
                  {item}
                </h4>
              ))}
            </div>
            <div className="flex justify-between mt-4 items-center">
              <p className="text-lg font-semibold">
                {activeIndex === 0
                  ? "Project details"
                  : activeIndex === 1
                  ? "Contact Info"
                  : activeIndex === 2
                  ? ""
                  : activeIndex === 3
                  ? ""
                  : "Images"}
              </p>
            </div>
          </div>
          {activeIndex === 0 &&
            (subscriptionStatus ? (
              <div>
                <div className="px-4 my-3 space-y-1">
                  <p className="text-lg font-semibold">Location Information</p>
                  <p className="text-[#071431] text-[15px]">
                    <span className="font-semibold text-black pr-1">
                      Status:
                    </span>
                    {details?.status}
                  </p>
                  <p className="text-[#071431] text-[15px]">
                    <span className="font-semibold text-black pr-1">
                      Address:
                    </span>
                    {details?.address}
                  </p>
                </div>
                <hr className="my-3 text-[#89B1AF]" />
                <div className="px-4 my-3 space-y-2">
                  <p className="text-lg font-semibold">Contractor details</p>
                  <p className="text-[#071431] text-[15px]">
                    <span className="font-semibold pr-1 text-black">
                      Project Build Type:
                    </span>
                    {details?.project_build_type}
                  </p>
                  <p className="text-[#071431] text-[15px]">
                    <span className="font-semibold pr-1 text-black">
                      Project Type:
                    </span>
                    {details?.project_type?.title}
                  </p>
                  <p className="text-[#071431] text-[15px]">
                    <span className="font-semibold pr-1 text-black">
                      Local Authority:
                    </span>
                    {details?.local_authority}
                  </p>
                  <div className="text-[#071431] text-[15px]">
                    <span className="font-semibold pr-1 text-black">
                      Description:
                    </span>
                    {parse(String(details?.description))}
                  </div>
                </div>
                <hr className="my-3 text-[#89B1AF]" />
                <div className="px-4 my-3 space-y-1 font-medium">
                  <p className="text-lg font-semibold">
                    CCS Monitoring details
                  </p>
                  <p className="">
                    This site
                    {details?.visited_status === "Yes" ? "has" : "has not"} been
                    visited yet.
                  </p>
                </div>
              </div>
            ) : (
              <UpgradePlan />
            ))}
          {activeIndex === 1 &&
            (subscriptionStatus ? (
              <div>
                <div className="px-4">
                  <div className="space-y-2">
                    <p className="text-[#071431] text-[15px]">
                      <span className="font-semibold pr-1 text-black">
                        Project Name:
                      </span>
                      {details?.name}
                    </p>
                    <p className="text-[#071431] text-[15px]">
                      <span className="font-semibold text-black pr-1">
                        Client:
                      </span>
                      {details?.client_name}
                    </p>

                    {!details?.site_reference ? (
                      <h4 className="text-sm col-span-2 text-gray-400 text-center w-full">
                        N/A
                      </h4>
                    ) : (
                      <div className="space-y-2 col-span-2">
                        <p className="text-[#071431] flex gap-1 text-[15px]">
                          <span className="font-semibold pr-1 text-black">
                            Site Reference:
                          </span>
                          {details?.site_reference}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 flex-wrap  col-span-2">
                      {details?.project_contacts?.map((contact, index) => (
                        <p key={index} className="text-[#071431] flex gap-1 text-[15px]">
                          <span className="font-semibold pr-1 text-black">
                            Contact:
                          </span>
                          <div className="w-full col-span-2 overflow-hidden">
                            <div className=" flex-wrap">
                              {parse(String(contact?.description))}
                            </div>
                          </div>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <UpgradePlan />
            ))}
          {activeIndex === 2 &&
            (subscriptionStatus ? (
              <div>
                <div className="px-5 w-full grid grid-cols-2 gap-3">
                  {!details?.note ? (
                    <h4 className="text-sm col-span-2 text-gray-400 text-center w-full">
                      No Notes Found
                    </h4>
                  ) : (
                    <div className="space-y-2 col-span-2">
                      <p className="text-[#071431] flex gap-1 text-[15px]">
                        <span className="font-semibold pr-1 text-black">
                          Note:
                        </span>
                        {details?.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <UpgradePlan />
            ))}
          {activeIndex === 3 &&
            (subscriptionStatus ? (
              <div>
                <div className="px-5 w-full overflow-hidden grid grid-cols-2 gap-3">
                  {details.project_links.length < 1 && (
                    <h4 className="text-sm col-span-2 text-gray-400 text-center w-full">
                      No Links Found
                    </h4>
                  )}
                  <div className="space-y-2 flex-wrap  col-span-2">
                    {details?.project_links?.map((link, index) => (
                      <p key={index} className="text-[#071431] flex gap-1 text-[15px]">
                        <span className="font-semibold pr-1 text-black">
                          Links:
                        </span>
                        <div className="w-full col-span-2 overflow-hidden">
                          <a
                            className="text-blue-400 text-sm lg:text-sm  flex-wrap"
                            href={link.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.link}
                          </a>
                        </div>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <UpgradePlan />
            ))}
          {activeIndex === 4 &&
            (subscriptionStatus ? (
              <div>
                <div className="px-4 w-full grid grid-cols-2 gap-3">
                  {details.project_images?.length < 1 && (
                    <h4 className="text-sm col-span-2 text-gray-400 text-center w-full">
                      No Image Found
                    </h4>
                  )}
                  {details?.project_images?.map((img , index) => (
                    <div key={index} className="w-full h-full ">
                      <Image
                        preview={{
                          destroyOnClose: true,
                          imageRender: () => (
                            <img
                              className="w-full object-cover h-full"
                              src={img?.image}
                            />
                          ),
                          toolbarRender: () => null,
                        }}
                        src={img?.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <UpgradePlan />
            ))}
        </div>
        <div className="flex justify-center w-full pt-4">
          <button
            onClick={handleToAddPinned}
            className="py-3 h-10 bg-primary01 cursor-pointer flex items-center justify-center gap-2 text-white w-full rounded-lg"
          >
            <span>
              {" "}
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <div className="flex gap-2 justify-center items-center">
                  {" "}
                  <MapPlus /> Add to Pinned
                </div>
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RightProductDetails;
