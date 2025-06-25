import React from "react";
import BarLoader from "react-spinners/BarLoader";
function LoadingSpinner({ loading }) {
  return (
    <div>
      <div className="text-center w-full h-60 flex justify-center items-center text-2xl text-gray-500 my-20">
        {" "}
        <BarLoader
          loading={loading}
          color="#007570"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />{" "}
      </div>
    </div>
  );
}

export default LoadingSpinner;
