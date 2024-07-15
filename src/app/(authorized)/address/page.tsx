"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Location from "@/assets/layer1.png";
import Home from "@/assets/Vectorhome.png";

import { Radio } from "@mui/material";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import {
  createAddressApi,
  deleteAddressApi,
  editAddressApi,
  getAddressApi,
  setPrimaryAddressApi,
} from "@/apis";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

export default function AddressPage() {
  const [showAddress, setAddress] = useState(false);

  const [isPending, setPending] = useState(false);

  const [allAddress, setAllAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [indexDialog, setDialogIndex] = useState("");

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await getAddressApi();

      setAllAddress(res?.data?.addresses || []);
    })();
  }, []);

  function onShowDialog(i) {
    setDialogIndex(i);
    setAddressId("");
  }
  function onChangeAddress(id) {
    setDialogIndex("");
    setAddressId(id);
  }
  async function onCreateAddress(formdata) {
    try {
      setPending(true);

      const res = await createAddressApi(formdata);

      setAllAddress([...allAddress, res?.data?.address]);
      toast.success("Address has been created");
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }

  async function onEditAddress(id) {
    try {
      setPending(true);
      await setPrimaryAddressApi(id);
      toast.success("Primary address selected");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      onShowDialog("");
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }
  async function onDeleteAddress(id) {
    if (!addressId) {
      return toast.error("Please select the address");
    }
    try {
      setPending(true);
      await deleteAddressApi(id);
      const filterAddress = allAddress.filter((item) => item.id !== id);
      setAllAddress(filterAddress);
      toast.success("Address has been deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }

  function onCheckout() {
    if (!addressId) return toast.error("Please select address");
    router.push(`/PaymentAndAddress?addressId=${addressId}`);
  }

  return (
    <>
      <div className="lg:my-[80px] flex items-center justify-center  my-[20px] sm:my-[20px] md:my-[30px] lg:mx-[150px] sm:mx-[20px] md:mx-[30px]">
        <div className="rounded-3xl lg:w-[77%] w-[100%] min-h-[454px] max-h-auto">
          <p className="text-[30px] font-semibold mr-3 space-y-2">
            Shipping Address ({allAddress?.length} addresses)
          </p>
          <div className="space-y-3">
            {allAddress?.map((item, index) => (
              <div
                style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
                className="rounded-3xl p-[20px] w-full h-auto hover:border-[#F70000] border-[1px] "
              >
                <div className="flex items-center justify-between">
                  <p className="text-[24px] font-medium ">
                    {item?.address_label?.toUpperCase()}
                  </p>
                  <Radio
                    sx={{
                      color: "#F70000",
                      "& .MuiSvgIcon-root": {
                        fontSize: 34,
                      },
                      "&.Mui-checked": {
                        color: "#F70000",
                      },
                    }}
                    checked={
                      addressId === item?.id || indexDialog === index
                        ? true
                        : false
                    }
                    // onChange={() => setAddressId(item?.id)}
                    onChange={() => onChangeAddress(item?.id)}
                  />
                </div>
                <div className="flex items-center ">
                  <Image src={Home} alt="" className="w-[50px] h-[50px] mr-4" />
                  <div>
                    <p>
                      <span className="text-[16px] font-semibold ">
                        {item?.recipient_name}
                      </span>
                      <span className="text-[15px] font-medium text-[#777777] ">
                        ({item?.recipient_phone})
                      </span>
                    </p>
                    <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                      {item?.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center ">
                    <Image
                      src={Location}
                      alt=""
                      className="w-[18px] h-[23px] mr-2"
                    />
                    <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                      New, York
                    </p>
                  </div>
                  <div className="flex items-center relative">
                    <div className="flex items-center cursor-pointer justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] mr-3">
                      <FiEdit
                        onClick={() => onShowDialog(index)}
                        className="h-[20px] w-[20px] text-[#BABABA]"
                      />
                    </div>
                    <div
                      style={{ pointerEvents: `${isPending} && "none"` }}
                      className="flex cursor-pointer items-center justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] "
                    >
                      <MdOutlineDeleteOutline
                        onClick={() => onShowDialog(index)}
                        className="h-[20px] w-[20px] text-[#BABABA]"
                      />
                    </div>
                    {indexDialog === index ? (
                      <>
                        <div className="absolute top-0 right-[100%] px-2 py-2 mr-1 h-auto rounded-sm w-[230px] bg-white shadow-lg">
                          <p
                            style={{ pointerEvents: `${isPending} && "none"` }}
                            onClick={() => onEditAddress(item?.id)}
                            className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
                          >
                            <SlLocationPin /> Set as primary address
                          </p>
                          <p
                            style={{ pointerEvents: `${isPending} && "none"` }}
                            onClick={() => onDeleteAddress(item?.id)}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <AiOutlineDelete /> Delete address
                          </p>
                          <MdClose
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={() => setDialogIndex("")}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}

            <div className=" mt-[30px]">
              <p
                onClick={() => setAddress((prev) => !prev)}
                className="flex items-center cursor-pointer text-[20px] font-semibold mr-3 mb-4"
              >
                <MdOutlineAddToPhotos size={30} /> Add New Delivery Address
              </p>
              <button
                disabled={isPending}
                onClick={() => onCheckout()}
                className=" bg-[#F70000] w-full text-center disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-sm h-[50px] text-[18px] font-medium text-white"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
          {showAddress ? (
            <form
              action={onCreateAddress}
              style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
              className="rounded-3xl p-[30px] w-full mt-6 "
            >
              <p className="text-[24px] font-semibold">Add New Address</p>
              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">Name</label>
                <input
                  placeholder="Enter Your Name "
                  name="recipient_name"
                  required
                  className="border-[1px] w-full mt-[9px] border-[#7777777]   rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>

              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">
                  Address Title
                </label>
                <input
                  placeholder="Address Title e.g Home/Office etc"
                  required
                  name="address_label"
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>

              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">
                  Street Address
                </label>
                <input
                  placeholder="Address"
                  name="address"
                  required
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>

              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">
                  Phone Number
                </label>
                <input
                  placeholder="Phone Number"
                  name="recipient_phone"
                  required
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>
              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">Note</label>
                <input
                  placeholder="Note"
                  name="note"
                  required
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>

              <div className=" mt-[30px]">
                <button
                  disabled={isPending}
                  type="submit"
                  className=" bg-[#F70000] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-2xl h-[50px]  w-[181px] text-[18px] font-medium text-white"
                >
                  Add Address
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
}
