import React from "react";
import Image from "next/image";
import airpod from "@/assets/airpod.png";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
export default function ReferralRanking() {
  return (
    <div className=" lg:my-[50px] my-[20px] sm:my-[20px] md:my-[30px] lg:mx-[150px] mx-[20px] sm:mx-[20px] md:mx-[30px]">
      <p className="text-[24px] font-semibold text-black">
        {" "}
        Your referral link
      </p>
      <input className="lg:h-[70px] h-[50px] sm:h-[50px] w-[100%] border-[1px] border-[#0000000D] mt-3 rounded-xl relative pr-10 p-3 focus:outline-none" />
      <p className="text-[24px] font-semibold text-black mt-3">
        Referral Ranking
      </p>
      <div className="lg:flex hidden sm:hidden gap-3 w-[100%] items-center p-3">
        <div className="lg:w-[20%] w-[33%] sm:w-[33%]">
          <p className="text-[24px] font-medium text-[#777777] mt-3">Name</p>
        </div>
        <div className="lg:w-[20%] w-[33%] sm:w-[33%]">
          <p className="text-[24px] font-medium text-[#777777] mt-3">
            Referral Id
          </p>
        </div>
        <div className="lg:w-[20%] w-[33%] sm:w-[33%]">
          <p className="text-[24px] font-medium text-[#777777] mt-3">
            Ranking No
          </p>
        </div>
        <div className="lg:w-[20%] w-[33%] sm:w-[33%]">
          <p className="text-[24px] lg:pl-8 font-medium text-[#777777] mt-3">
            Bonus
          </p>
        </div>
        <div className="lg:w-[20%] w-[33%] sm:w-[33%]">
          <p className="text-[16px] text-center font-medium text-[#777777] mt-3">
            Referral Rate
          </p>
        </div>
      </div>
      <div className="flex lg:gap-3 w-[100%] justify-between justify-between sm items-center mt-2 p-3  bg-[#FDFDFD]">
        <div className="lg:w-[20%] flex items-center gap-3 w-[33%] sm:w-[33%]">
          <Image alt="" src={airpod} className="h-[42px] w-[42px]" />
          <p className="text-[16px] font-medium text-[#191919]">Name</p>
        </div>
        <div className="lg:w-[20%] lg:hidden block sm:block md:block  w-[33%] sm:w-[33%]">
          <p className="text-[13px] px-2 font-medium text-[#191919]">
            {" "}
            100 Referrals
          </p>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <p className="text-[16px] font-medium text-[#191919]">#ey79ikmn</p>
        </div>
        <div className="lg:w-[20%] w-[33%] lg:pl-[50px] sm:w-[33%]">
          <div className="bg-gradient-to-br from-[#FFA1A1] to-[#F70000] h-[32px] rounded-lg w-[32px] flex justify-center items-center">
            <p className="text-[20px] font-semibold text-white">1</p>
          </div>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <button className="text-[#FFA31A] text-sm lg:text-[12px] font-medium w-[150px] bg-[#FFF6E8]  rounded-lg h-[45px] lg:h-[37px] px-4 lg:px-8">
            Cash Reward
          </button>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <p className="text-[16px] text-center font-medium text-[#191919]">
            180/200
          </p>
        </div>
      </div>
      <div className="flex lg:gap-3 w-[100%] justify-between items-center mt-2 p-3  bg-white">
        <div className="lg:w-[20%] flex items-center gap-3 w-[33%] sm:w-[33%]">
          <Image alt="" src={airpod} className="h-[42px] w-[42px]" />
          <p className="text-[16px] font-medium text-[#191919]">Name</p>
        </div>
        <div className="lg:w-[20%] lg:hidden block sm:block md:block  w-[33%] sm:w-[33%]">
          <p className="text-[13px] px-2 font-medium text-[#191919]">
            {" "}
            100 Referrals
          </p>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <p className="text-[16px] font-medium text-[#191919]">#ey79ikmn</p>
        </div>
        <div className="lg:w-[20%] w-[33%] lg:pl-[50px] sm:w-[33%]">
          <div className="bg-gradient-to-br from-[#FFA1A1] to-[#F70000] h-[32px] rounded-lg w-[32px] flex justify-center items-center">
            <p className="text-[20px] font-semibold text-white">2</p>
          </div>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <button className="text-[#0082CE] text-sm lg:text-[12px] font-medium w-[150px] bg-[#ECF8FF]  rounded-lg h-[45px] lg:h-[37px] px-4 lg:px-8">
            Discount
          </button>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <p className="text-[16px] text-center font-medium text-[#191919]">
            180/200
          </p>
        </div>
      </div>
      <div className="flex lg:gap-3 w-[100%] justify-between items-center mt-2 p-3  bg-[#FDFDFD]">
        <div className="lg:w-[20%] flex items-center gap-3 w-[33%] sm:w-[33%]">
          <Image alt="" src={airpod} className="h-[42px] w-[42px]" />
          <p className="text-[16px] font-medium text-[#191919]">Name</p>
        </div>
        <div className="lg:w-[20%] lg:hidden block sm:block md:block  w-[33%] sm:w-[33%]">
          <p className="text-[13px] px-2 font-medium text-[#191919]">
            {" "}
            100 Referrals
          </p>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <p className="text-[16px] font-medium text-[#191919]">#ey79ikmn</p>
        </div>
        <div className="lg:w-[20%] w-[33%] lg:pl-[50px] sm:w-[33%]">
          <div className="bg-gradient-to-br from-[#FFA1A1] to-[#F70000] h-[32px] rounded-lg w-[32px] flex justify-center items-center">
            <p className="text-[20px] font-semibold text-white">3</p>
          </div>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <button className="text-[#C700CB] text-sm lg:text-[12px] font-medium w-[150px] bg-[#FCEDFF]  rounded-lg h-[45px] lg:h-[37px] px-4 lg:px-8">
            Coupons
          </button>
        </div>
        <div className="lg:w-[20%] lg:block hidden sm:hidden md:hidden  w-[33%] sm:w-[33%]">
          <p className="text-[24px] text-center font-medium text-[#191919]">
            180/200
          </p>
        </div>
      </div>

      <div className="mt-5 gap-3 lg:flex justify-center items-center sm:hidden hidden">
        <button className="text-[#F70000] flex justify-center gap-4 items-center text-sm lg:text-[12px] font-medium w-[150px] bg-white  border-[1px] rounded-lg h-[45px] lg:h-[40px] px-4 lg:px-8">
          <MdArrowBackIos className="text-[16px]" />
          <p className="text-[14px] font-medium">Previous</p>
        </button>
        <div className="flex justify-center bg-[#F70000] items-center  rounded-lg h-[40px] w-[40px]">
          <p className="text-white text-[22px] font-medium">1</p>
        </div>
        <div className="flex justify-center items-center border-[1px] rounded-lg h-[40px] w-[40px]">
          <p className="text-[#777777] text-[22px] font-medium">2</p>
        </div>
        <div className="flex justify-center items-center border-[1px] rounded-lg h-[40px] w-[40px]">
          <p className="text-[#777777] text-[22px] font-medium">3</p>
        </div>
        <div className="flex justify-center items-center border-[1px] rounded-lg h-[40px] w-[40px]">
          <p className="text-[#777777] text-[22px] font-medium">4</p>
        </div>{" "}
        <div className="flex justify-center items-center border-[1px] rounded-lg h-[40px] w-[40px]">
          <p className="text-[#777777] text-[22px] font-medium">...</p>
        </div>
        <button className="text-white flex justify-center gap-4 items-center text-sm lg:text-[12px] font-medium w-[150px] bg-[#F70000]  rounded-lg h-[45px] lg:h-[40px] px-4 lg:px-8">
          <p className="text-[14px] font-medium">Next</p>
          <MdArrowForwardIos className="text-[16px]" />
        </button>
      </div>
    </div>
  );
}
