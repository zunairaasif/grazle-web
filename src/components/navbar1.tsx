"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/assets/Grazle Logo.png";
import Search from "@/assets/search.png";
import Cart from "@/assets/Cart.png";
import Seller from "@/assets/Vector.png";
import MenuIcon from "@/assets/VectorMenu.png";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { IoClose, IoHeartOutline } from "react-icons/io5";
import { CiLocationOn, CiTimer } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
import user from "@/assets/users.png";
import Fav from "@/assets/hearts.png";
import Location from "@/assets/Group 1820549981.png";
import card from "@/assets/Group 1820549982.png";
import bulid from "@/assets/Vector (3).png";
import crown from "@/assets/crown.png";
import Setting from "@/assets/Group 1820549985.png";
import FAQ from "@/assets/Group 1820549989.png";
import terms from "@/assets/Group 1820549990.png";
import Privcy from "@/assets/Layer 2.png";
import { IoIosTimer } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export default function Navbar() {
  const router = useRouter();

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")!;
  }
  const handleGoToLogin = () => {
    router.push("/Login");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [menuBar, setIsMenuBar] = useState(false);

  const containerRef: any = useRef(null);
  const searchContainerRef: any = useRef(null);
  const MenubarRef: any = useRef(null);

  const handleToggleMenu = () => {
    setIsMenuBar((prev) => !prev);
  };
  const handleMenuclose = () => {
    setIsMenuBar(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleToggleSearch = () => {
    setIsOpenSearch((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    if (MenubarRef.current && !MenubarRef.current.contains(event.target)) {
      setIsMenuBar(false);
    }
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setIsOpenSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div
        className="px-[16px] 
      lg:px-[150px] bg-[#F8F8F8] py-1 md:px-[60px]  flex-wrap lg:flex sm:flex-wrap   items-center justify-between"
      >
        <p className="text-[14px] font-normal text-[#909198] lg:text-start text-center">
          © 2020 Landify UI Kit. All rights reserved
        </p>
        <div className="flex items-center lg:justify-start justify-center  ">
          <Link
            href="/Terms&Conditions"
            className="lg:text-[14px] text-[10px] font-normal text-[#909198]"
          >
            Terms & Conditions
          </Link>
          <div className="border-l-[1px] border-[#909198] mx-2 h-2"></div>
          <Link
            href="/Terms&Conditions"
            className="lg:text-[14px] text-[10px] font-normal text-[#909198]"
          >
            Privacy Policy
          </Link>

          <div className="border-l-[1px] border-[#909198] mx-2 h-2"></div>
          <p className="lg:text-[14px] text-[10px] font-normal text-[#909198]">
            Sitemap
          </p>
          <div className="border-l-[1px] border-[#909198] mx-2 h-2"></div>
          <p className="lg:text-[14px] text-[10px] font-normal text-[#909198]">
            Disclaimer
          </p>
        </div>
      </div>
      {/* <div className="mx-[16px] lg:mx-[150px] md:mx-[60px] my-[16px] flex flex-col md:flex-wrap  sm:flex-row sm:items-center">
        <div className="flex items-center justify-between w-full md:w-auto sm:w-auto">
          <div className="flex items-center">
            <Image
              src={MenuIcon}
              alt="Menu"
              className="w-[30px] h-[24px] relative mr-2 sm:hidden"
              onClick={handleToggleMenu}
            />
            {menuBar && (
              <div className="absolute left-0 top-10 mt-2 w-[335px] bg-white z-10 shadow-lg border border-[#D2D4DA] rounded-md">
                <div className="flex items-center justify-between bg-[#F700000D] px-6 py-3">
                  <div className="flex  gap-2 items-center">
                    <FaUser className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-medium text-black">
                      Hi, Log in
                    </p>
                  </div>
                  <IoClose
                    className="w-[18px] h-[18px]"
                    onClick={handleMenuclose}
                  />
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href="/MyAccount"
                    className="flex gap-2 mt-6 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={user} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      Your Account
                    </p>
                  </Link>
                  <Link
                    href="/MyOrders"
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={bulid} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      My Order
                    </p>
                  </Link>
                  <div
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={Fav} alt="" className="w-[20px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      Favourites
                    </p>
                  </div>{" "}
                  <div
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image
                      src={Location}
                      alt=""
                      className="w-[18px] h-[18px]"
                    />
                    <p className="text-[16px] font-normal text-black">
                      Manage Addresses
                    </p>
                  </div>{" "}
                  <Link
                    href="/CreditLimit"
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={card} alt="" className="w-[20px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      Credit Limit
                    </p>
                  </Link>
                  <Link
                    href="/ReferralRanking"
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={bulid} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      Referral Ranking
                    </p>
                  </Link>
                  <Link
                    href="/PaymentPlan"
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={crown} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      Grazzle Membership
                    </p>
                  </Link>
                  <div
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={Setting} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      Notification Settings
                    </p>
                  </div>{" "}
                  <p className="text-[16px] font-semibold mt-3 text-black">
                    Grazzle
                  </p>
                  <Link
                    href="/FAQs"
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={FAQ} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">FAQs</p>
                  </Link>
                  <Link
                    href="/Terms&Conditions"
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={terms} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black">
                      Terms of Use
                    </p>
                  </Link>
                  <Link
                    href="/Terms&Conditions"
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <Image src={Privcy} alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[16px] font-normal text-black ">
                      Privacy Policy
                    </p>
                  </Link>
                  <div
                    className="flex gap-2 mt-4 items-center"
                    onClick={handleMenuclose}
                  >
                    <BiLogOut className="text-[18px] text-[#777777]" />
                    <p className="text-[16px] font-normal text-black">Logout</p>
                  </div>{" "}
                </div>
              </div>
            )}

            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                className="lg:w-[80px] lg:h-[47px]  w-[60px] h-[37px] "
              />
            </Link>
          </div>
          <Link
            href="/"
            className="hidden lg:flex items-center color-[#393A44] text-[14px] font-normal mx-[64px]"
          >
            <p className="mr-[24px]">Home</p>
            <div className="border-l-[1px] border-r-[1px] border-[#D2D4DA]">
              <p className="mx-[24px]">Offers</p>
            </div>
            <div>
              <p className="ml-[24px]">Categories</p>
            </div>
          </Link>
          <div className="hidden lg:flex mr-[64px] ">
            <div ref={searchContainerRef} className="relative w-[380px]">
              <input
                placeholder="Search"
                className="w-full lg:w-[380px] sm:w-[300px] h-[52px] rounded-full pl-[50px] focus:outline-none border-[1px] border-[#D2D4DA]"
                onClick={handleToggleSearch}
              />
              <Image
                src={Search}
                alt="Search"
                className="w-[36px] h-[36px] absolute top-[50%] left-[10px] transform -translate-y-1/2"
              />
              {isOpenSearch && (
                <div className="fixed inset-0 z-50 opacity-100 bg-[rgba(0,0,0,0.5);] top-[115px]">
                  <div className="absolute bg-white opacity-100  right-[37%] mt-2 w-[400px]  z-10 p-4 px-6 shadow-lg border border-[#D2D4DA] rounded-xl">
                    <div className="flex gap-3 items-center">
                      <CiTimer className="text-black text-[#777777]" />
                      <p className="text-black text-[16px] font-semibold">
                        Recent Searches
                      </p>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <Link
                        href="/StoreprouctPage"
                        className="border-[1px] border-[#777777] rounded-full px-3 py-2"
                      >
                        <p className="text-black text-[14px] font-normal">
                          Display Tech
                        </p>
                      </Link>
                      <div className="border-[1px] border-[#777777] rounded-full px-3 py-2">
                        <p className="text-black text-[14px] font-normal">
                          Display Tech
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <div className="border-[1px] border-[#777777] rounded-full px-3 py-2">
                        <p className="text-black text-[14px] font-normal">
                          Display Tech
                        </p>
                      </div>
                      <div className="border-[1px] border-[#777777] rounded-full px-3 py-2">
                        <p className="text-black text-[14px] font-normal">
                          Display Tech
                        </p>
                      </div>
                    </div>
                    <div className="rounded-xl mt-3 bg-[#E8E8E8] p-3 w-[80%]">
                      <p className="text-black text-[16px] font-semibold">
                        Popular Searches
                      </p>{" "}
                      <div className="flex gap-3 mt-3">
                        <div className="border-[1px] bg-white border-white rounded-full px-3 py-2">
                          <p className="text-black text-[14px] font-normal">
                            Display Tech
                          </p>
                        </div>
                        <div className="border-[1px] bg-white border-white rounded-full px-3 py-2">
                          <p className="text-black text-[14px] font-normal">
                            Display Tech
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <div className="border-[1px] bg-white border-white rounded-full px-3 py-2">
                          <p className="text-black text-[14px] font-normal">
                            Display Tech
                          </p>
                        </div>
                        <div className="border-[1px] bg-white border-white rounded-full px-3 py-2">
                          <p className="text-black text-[14px] font-normal">
                            Display Tech
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center w-[150px] lg:w-[470px]  text-[14px] font-normal lg:ml-[0px] md:ml-[200px] sm:ml-[0px]">
            <Link href="/CartPage" className="flex items-center mr-4 ">
              <Image src={Cart} alt="Cart" className="w-[24px] h-[24px] mr-2" />
              <p className="text-[12px] hidden sm:block">Cart</p>
            </Link>
            <div className="border-r-[1px] border-[#D2D4DA] mx-[8px] md:mx-[20px] h-4"></div>
            <Link href="/RegisterSeller" className="flex items-center">
              <Image
                src={Seller}
                alt="Seller"
                className="w-[24px] h-[24px] mr-2"
              />
              <p className="text-[12px] hidden sm:block lg:block">
                Become Seller
              </p>
            </Link>
            <div className="w-[130px] flex justify-end">
              <div ref={containerRef} className="relative">
                <Avatar
                  className="w-[44px] h-[44px] ml-[16px] "
                  onClick={handleToggle}
                />
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-[335px] bg-white z-10 p-5 shadow-lg border border-[#D2D4DA] rounded-md">
                    <Link href="/MyAccount" className="flex gap-2 items-center">
                      <Image src={user} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Your Account
                      </p>
                    </Link>
                    <Link href="/MyOrders" className="flex gap-2 items-center">
                      <Image src={bulid} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        My Orders
                      </p>
                    </Link>
                    <div className="flex gap-2 mt-4 items-center">
                      <Image src={Fav} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Favourites
                      </p>
                    </div>{" "}
                    <div className="flex gap-2 mt-4 items-center">
                      <Image
                        src={Location}
                        alt=""
                        className="w-[18px] h-[18px]"
                      />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Manage Addresses
                      </p>
                    </div>{" "}
                    <Link
                      href="/CreditLimit"
                      className="flex gap-2 mt-4 items-center"
                    >
                      <Image src={card} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Credit Limit
                      </p>
                    </Link>
                    <Link
                      href="/ReferralRanking"
                      className="flex gap-2 mt-4 items-center"
                    >
                      <Image src={bulid} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Referral Ranking
                      </p>
                    </Link>
                    <Link
                      href="/PaymentPlan"
                      className="flex gap-2 mt-4 items-center"
                    >
                      <Image src={crown} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Grazzle Membership
                      </p>
                    </Link>
                    <div className="flex gap-2 mt-4 items-center">
                      <Image
                        src={Setting}
                        alt=""
                        className="w-[18px] h-[18px]"
                      />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Notification Settings
                      </p>
                    </div>{" "}
                    <p className="text-[16px] font-semibold mt-3 text-[#777777]">
                      Grazzle
                    </p>
                    <Link href="/FAQs" className="flex gap-2 mt-4 items-center">
                      <Image src={FAQ} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        FAQs
                      </p>
                    </Link>
                    <Link
                      href="/Terms&Conditions"
                      className="flex gap-2 mt-4 items-center"
                    >
                      <Image src={terms} alt="" className="w-[18px] h-[18px]" />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Terms of Use
                      </p>
                    </Link>
                    <Link
                      href="/Terms&Conditions"
                      className="flex gap-2 mt-4 items-center"
                    >
                      <Image
                        src={Privcy}
                        alt=""
                        className="w-[18px] h-[18px]"
                      />
                      <p className="text-[16px] font-normal text-[#777777]">
                        Privacy Policy
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 md:mt-3 w-full lg:hidden">
          <div ref={searchContainerRef} className="relative w-full">
            <input
              placeholder="Search"
              className="w-full sm:w-[300px] md:w-full h-[52px] rounded-full pl-[50px] focus:outline-none border-[1px] border-[#D2D4DA]"
              onClick={handleToggleSearch}
            />
            <Image
              src={Search}
              alt="Search"
              className="w-[36px] h-[36px] absolute top-[50%] left-[8px] transform -translate-y-1/2"
            />
            {isOpenSearch && (
              <div className="absolute w-full bg-white shadow-lg border border-[#D2D4DA] mt-2 rounded-md">
                <p className="p-4">Search Dropdown Content</p>
              </div>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
}
