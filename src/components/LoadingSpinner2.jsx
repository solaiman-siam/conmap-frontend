
import BarLoader from "react-spinners/BarLoader";

function LoadingSpinner2({isLoading}) {
  return (
    <div>
      <div className="text-center w-full pb-8  flex justify-center items-center text-2xl text-gray-500 ">
        <BarLoader
          loading={isLoading}
          color="#007570"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />{" "}
      </div>
    </div>
  )
}

export default LoadingSpinner2