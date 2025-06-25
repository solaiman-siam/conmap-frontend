import React from "react";
import Coin from "../../../Assets/Images/Logo/Coin.png";
import { Link } from "react-router";

const Creditcards = ({ bonus, price }) => {
  return (
    <div className="px-6 py-[50px] bg-[#007570] border border-[#007570] rounded-[16px] cursor-pointer hover:-translate-y-2 duration-300">
      <div className="flex justify-center">
        <img src={Coin} alt="Coin" />
      </div>
      <h3 className="text-[32px] font-semibold text-[#FFF] text-center pt-5 pb-4 leading-none">
        {price}
      </h3>
      <p className="text-[16px] font-normal text-[#FFF] text-center leading-none">
        {bonus}
      </p>
      <div className="flex justify-center mt-8">
        <Link to='/payment'>
          <button className="bg-white text-[#007570] py-[19px] px-[160px] rounded-[8px] text-center font-semibold font-nunito cursor-pointer">
            Select
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Creditcards;
