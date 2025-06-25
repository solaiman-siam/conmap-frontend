import toast from "react-hot-toast";
import useAxiosCommon from "./useAxiosCommon";

function useProjectDetails() {
  const axiosCommon = useAxiosCommon()

  const handleDetails = async (id) => {
    try {
      const result = await axiosCommon.get(`/project/${id}`);
      return result.data; // Return the data instead of just logging it
    } catch (error) {
      toast.error("Error fetching project details:", error);
      return null;
    }
  };

  return { handleDetails }; // Return the function so it can be used
}

export default useProjectDetails;
