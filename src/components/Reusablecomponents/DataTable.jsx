import { useContext, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { ProjectIcon } from "../../Assets/Images/icon/Icon";
import useAxiosCommon from "../../hooks/api-hooks/useAxiosCommon";
import { MainContext } from "../../context/StateContext/StateContext";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner2 from "../LoadingSpinner2";
import useAxiosSecure from "../../hooks/api-hooks/useAxiosSecure";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
export default function DataTable({ listView, pinnedView }) {
  const [totalProject, setTotalProject] = useState(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalProject / itemsPerPage);
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient()
  // const totalPages = Math.ceil(users.length / itemsPerPage);
  // const [users, setusers] = useState([])
  const {
    setProjectId,
    isRightBarOpen,
    setIsRightBarOpen,
    sByProject,
    sByAddress,
    sByClient,
    sByLocalAuthority,
    currentLat,
    currentLong,
    radius,
  } = useContext(MainContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [removingPinId, setRemovingPinId] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: [
      "projectsList",
      currentPage,
      sByProject,
      sByAddress,
      sByClient,
      sByLocalAuthority,
      currentLat,
      currentLong,
      radius,
    ],
    queryFn: async () => {
      const result = await axiosCommon.get(
        `/project?per_page=${5}&page=${currentPage}&search=${sByProject}&client_name=${sByClient}&local_authority=${sByLocalAuthority}&address=${sByAddress}&latitude=${currentLat}3&longitude=${currentLong}&location_radius=${radius}`
      );
      console.log(result?.data?.data?.total);
      setTotalProject(result?.data?.data?.total);
      return result?.data?.data?.data;
    },
  });

  console.log("list", users);

  // useEffect(() => {
  //   ( async() => {
  //     const result = await axiosCommon.get(`/project?per_page=${5}&page=${itemOffset}`)
  //     console.log(result?.data?.data?.total);
  //     setTotalProject(result?.data?.data?.total);
  //     setusers(result?.data?.data?.data);
  //   })()

  // },[])

  const handlePageClick = ({ selected }) => {
    // const newOffset = (event.selected * itemsPerPage) % totalPages;
    setCurrentPage(selected);
  };

  console.log(totalPages);

  const { data: pinnedProjects = [], isLoading: pinnedLoading } = useQuery({
    queryKey: ["pinnedProjects"],
    queryFn: async () => {
      const result = await axiosSecure.get("/project-pin");
      return result?.data?.data;
    },
    enabled: pinnedView, // assuming you use this condition
  });

  console.log(pinnedProjects);




  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.post(`/project-pin/destroy/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Pin removed successfully');
      queryClient.invalidateQueries({ queryKey: ['pinnedProjects'] });
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.message || 'Something went wrong';
      toast.error(errorMsg);
    },
  });
  
  const handleRemovePin = (id) => {
    setRemovingPinId(id)
    mutate(id);
  };
  

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        {listView && (
          <table className="w-full divide-y divide-gray-200">
            <thead className="w-full bg-[#007570] text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Name
                </th>
                {users.length > 0 && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase"
                  ></th>
                )}

                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y w-full divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="text-center py-10">
                    <LoadingSpinner2 />
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users?.map((user, index) => (
                  <tr key={user?.id} className="hover:bg-gray-50">
                    <td className=" text-wrap px-2 md:px-6 py-2 md:py-4 text-sm font-medium text-gray-900 flex items-center gap-2 md:gap-4 lg:gap-7">
                      <ProjectIcon />
                      {user.name}
                    </td>
                    <td className="text-end  px-2 md:px-6 py-2 md:py-4">
                      <button
                        onClick={() => {
                          setProjectId(user?.id);
                          setIsRightBarOpen(true);
                        }}
                        className="text-white cursor-pointer py-1.5 px-4 bg-[#007570] rounded-lg"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-10">
                    <h4 className="text-gray-400 font-light text-sm">
                      No Data Found!!
                    </h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {pinnedView && (
          <table className="w-full divide-y divide-gray-200">
            <thead className="w-full bg-[#007570] text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Name
                </th>
                {pinnedProjects.length > 0 && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase"
                  ></th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y w-full divide-gray-200 bg-white">
              {pinnedLoading ? (
                <tr>
                  <td colSpan={2} className="text-center py-10">
                    <LoadingSpinner2 />
                  </td>
                </tr>
              ) : pinnedProjects.length > 0 ? (
                pinnedProjects?.map((pinned, index) => (
                  <tr key={pinned?.project?.id} className="hover:bg-gray-50">
                    <td className=" text-wrap px-2 md:px-6 py-2 md:py-4 text-sm font-medium text-gray-900 flex items-center gap-2 md:gap-4 lg:gap-7">
                      <ProjectIcon />
                      {pinned?.project?.name}
                    </td>
                    <td className="text-end px-2 md:px-6 py-2 md:py-4">
                      <button
                        onClick={() => {
                          setProjectId(pinned?.project?.id);
                          setIsRightBarOpen(true);
                        }}
                        className="text-white cursor-pointer py-1.5 px-4 bg-[#007570] rounded-lg"
                      >
                        View
                      </button>
                      <button onClick={() => handleRemovePin(pinned?.id)} className="cursor-pointer bg-primary01 translate-y-1 ml-2   p-2  rounded-lg">
                      {
                        isPending && removingPinId === pinned?.id ? <span><Loader color="white" size={20} className="animate-spin " /></span> :
                        <svg className=" translate-x-[1.5px]" xmlns="http://www.w3.org/2000/svg" version="1.1"  xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 427 427.001"  xmlSpace="preserve" data-sg-is-observed="true" ><g data-sg-is-observed="true"><path d="M232.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zM114.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0" fill="#ffffff" opacity="1" data-original="#000000" data-sg-is-observed="true" ></path><path d="M28.398 127.121V373.5c0 14.563 5.34 28.238 14.668 38.05A49.246 49.246 0 0 0 78.796 427H268a49.233 49.233 0 0 0 35.73-15.45c9.329-9.812 14.668-23.487 14.668-38.05V127.121c18.543-4.922 30.559-22.836 28.079-41.863-2.485-19.024-18.692-33.254-37.88-33.258h-51.199V39.5a39.289 39.289 0 0 0-11.539-28.031A39.288 39.288 0 0 0 217.797 0H129a39.288 39.288 0 0 0-28.063 11.469A39.289 39.289 0 0 0 89.398 39.5V52H38.2C19.012 52.004 2.805 66.234.32 85.258c-2.48 19.027 9.535 36.941 28.078 41.863zM268 407H78.797c-17.098 0-30.399-14.688-30.399-33.5V128h250v245.5c0 18.813-13.3 33.5-30.398 33.5zM109.398 39.5a19.25 19.25 0 0 1 5.676-13.895A19.26 19.26 0 0 1 129 20h88.797a19.26 19.26 0 0 1 13.926 5.605 19.244 19.244 0 0 1 5.675 13.895V52h-128zM38.2 72h270.399c9.941 0 18 8.059 18 18s-8.059 18-18 18H38.199c-9.941 0-18-8.059-18-18s8.059-18 18-18zm0 0" fill="#ffffff" opacity="1" data-original="#000000" data-sg-is-observed="true" ></path><path d="M173.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0" fill="#ffffff" opacity="1" data-original="#000000" data-sg-is-observed="true" ></path></g></svg>
                      }
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-10">
                    <h4 className="text-gray-400 font-light text-sm">
                      No Data Found!!
                    </h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className=" px-8 py-4  border-gray-200">
        <ReactPaginate
          breakLabel="..."
          className="flex items-center gap-2 mt-4"
          nextLabel="Next >"
          previousLabel="< Prev"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          activeClassName="bg-primary01 text-sm text-white px-2 py-1 "
          pageLinkClassName="px-2 py-2 text-sm"
          previousLinkClassName="px-3 py-1.5 bg-primary01 text-white text-sm cursor-pointer  bg-gray-300"
          nextLinkClassName="px-3 py-1.5 text-sm bg-primary01 text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
