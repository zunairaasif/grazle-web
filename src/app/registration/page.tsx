"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import register from "@/assets/pose_38 1.png";
import logo from "@/assets/Grazle Logo.png";
import { IoMdMail } from "react-icons/io";
import { TiLockClosed } from "react-icons/ti";
import { Checkbox } from "@mui/material";
import { FaUser } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { createReferralApi, joinedReferralApi, registerApi } from "@/apis";
import Link from "next/link";
import { BiLoader } from "react-icons/bi";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [completeUrl, setCompleteUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = window.location.href;
      setCompleteUrl(fullUrl);
    }
  }, []);
  const refId = useSearchParams().get("ref_id");

  async function onRegisterAccount(formdata) {
    const password = formdata.get("password");
    const cPassword = formdata.get("cPassword");
    if (password !== cPassword) {
      return toast.error("Password and confirm password should be same");
    }
    try {
      formdata.append("role", "buyer");
      setLoading(true);
      const { data } = await registerApi(formdata);
      setLoading(false);

      if (data.user && refId) {
        const formdata = new FormData();
        formdata.append("receiver_id", data.user.id);
        formdata.append("unique_link", completeUrl);
        const res = await joinedReferralApi(formdata);
        console.log("res", res);
      }

      toast.success("Account created successfully");
      router.push("/signIn");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <form
      action={onRegisterAccount}
      className="w-[100%] h-auto lg:flex flex-wrap lg:flex md:flex-wrap sm:flex-wrap items-center lg:p-[50px] p-[20px] sm:p-[20px] md:p-[30px]"
    >
      <div
        style={{
          background:
            "linear-gradient(162.65deg, #FF781E 1.87%, #FDC197 88.1%)",
        }}
        className="lg:w-[50%] h-[400px] sm:h-[400px] md:h-[400px]  lg:h-[700px] sm:[100%] md:[100%] w-[100%] h-autotext-white relative rounded-[60px] lg:px-[40px] sm:px-[20px] px-[30px] lg:py-[50px] sm:py-[20px] py-[20px] lg:my-[50px] sm:my-[10px] my-[0px]"
      >
        <p className="lg:text-[40px] text-[16px] sm:text-[18px] md:text-[24px] font-semibold">
          Discover endless possibilities
        </p>
        <div className="w-[60%]">
          <p className="lg:text-[40px] text-[16px] sm:text-[18px] md:text-[24px] font-bold  ">
            Explore, buy, and sell with our vibrant maketplace
          </p>
        </div>

        <Image
          src={register}
          alt=""
          className=" lg:w-[100%] lg:top-[100px] top:[0px] absolute right-[30px] lg:h-[650px] h-[320px]"
        />
      </div>
      <div className="lg:w-[50%] sm:[100%] md:[100%] w-[100%] h-auto lg:pl-[50px] pl-[0px] py-[50px] ">
        <div className="flex flex-col justify-center items-center ">
          <Image src={logo} alt="" className="w-[210px] h-[125px]" />
          <p className="mt-6 text-[40px] font-semibold">Welcome Here</p>
          <p className=" text-[18px] font-medium text-[#777777]">
            Please create your account
          </p>
        </div>
        <div>
          <div className="relative mt-[40px] w-full">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777777] text-[20px]" />
            <input
              className="bg-[#F5F7F9] pl-11 w-full rounded-md h-[50px] p-3 focus:outline-none placeholder:text-[#777777]"
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <div className="relative mt-[20px] w-full">
            <IoMdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777777] text-[20px]" />
            <input
              className="bg-[#F5F7F9] pl-11 w-full rounded-md h-[50px] p-3 focus:outline-none placeholder:text-[#777777]"
              placeholder="Email Address"
              name="email"
              required
            />
          </div>
          <div className="relative mt-[20px] w-full">
            <IoMdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777777] text-[20px]" />
            <input
              className="bg-[#F5F7F9] pl-11 w-full rounded-md h-[50px] p-3 focus:outline-none placeholder:text-[#777777]"
              placeholder="Phone#"
              name="phone"
              required
            />
          </div>
          <div className="relative mt-[20px] w-full">
            <TiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777777] text-[24px]" />
            <input
              type={showPassword ? "text" : "password"}
              className="bg-[#F5F7F9] pl-11 w-full rounded-md h-[50px] p-3 focus:outline-none placeholder:text-[#777777]"
              placeholder="Password"
              name="password"
              required
              min={8}
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#777777] text-[24px]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="relative mt-[20px] w-full">
            <TiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777777] text-[24px]" />
            <input
              type={showPassword ? "text" : "password"}
              className="bg-[#F5F7F9] pl-11 w-full rounded-md h-[50px] p-3 focus:outline-none placeholder:text-[#777777]"
              placeholder="Password"
              min={8}
              name="cPassword"
              required
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#777777] text-[24px]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <Checkbox
            sx={{
              color: "#F70000",
              "& .MuiSvgIcon-root": {
                fontSize: 24,
              },
              "&.Mui-checked": {
                color: "#F70000",
              },
            }}
          />
          <p className="text-black font-normal text-[16px] ">
            By Clicking i agree all terms of services and Privacy & Policy.
          </p>
        </div>

        <button className=" bg-[#F70000] rounded-xl h-[50px] mt-[30px] w-[100%] text-[18px] font-medium text-white">
          {loading ? <BiLoader className="animate-spin h-5 w-5" /> : "Sign Up"}
        </button>

        <p className="font-normal text-[#777777] text-[16px] text-center mt-10">
          Don’t Have an Account?
          <Link href="/signIn">
            <strong className="ml-2 font-medium text-[#F70000] cursor-pointer">
              Sign in
            </strong>
          </Link>
        </p>
      </div>
    </form>
  );
}
