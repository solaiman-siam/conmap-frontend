import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`max-w-[1650px] w-full px-4 md:px-6 xl:px-8 mx-auto ${className}`}>{children}</div>
  );
};

export default Container;
