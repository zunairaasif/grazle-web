import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCloseSharp, IoLockClosed } from "react-icons/io5";
import Chair from "@/assets/pngwing 2.png";
import close from "@/assets/close.png";
import Shoes from "@/assets/Rectangle 2032.png";
import Image from "next/image";
import AAA from "@/assets/Health Report.png";
import BBB from "@/assets/Box.png";
import CCC from "@/assets/Shipping.png";
import DDD from "@/assets/sort by time.png";
import { PiCameraThin } from "react-icons/pi";
import { timeAgo } from "@/utils";
import CustomModal from "./CustomModel";
import { Rating } from "@mui/material";
import { addReviewApi, cancelOrderApi, getOrderTrackingApi } from "@/apis";
import { toast } from "react-toastify";
const MyorderCard = ({ order, status }: { order: any; status?: any }) => {
  const [showSendModel, setShowSendModel] = useState(false);
  const [showConfirm, setShowconfirm] = useState(false);
  const [showleave, setShowLeave] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [productId, setProductId] = useState("");

  const [orderTracking, setOrderTracking] = useState({});
  useEffect(() => {
    (async () => {
      const { data } = await getOrderTrackingApi(order.id);
      setOrderTracking(data.order);
    })();
  }, [order.id]);

  const handleOpeneModel = () => {
    setShowSendModel(true);
  };
  const handleCloseModel = () => {
    setShowSendModel(false);
  };
  const [isDivVisible, setIsDivVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDivVisible((prev) => !prev);
  };

  const cancelModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  const handleRevModal = () => {
    setShowLeave((prev) => !prev);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const imagePreviews = files.map((file) => URL.createObjectURL(file));
      setSelectedImages(imagePreviews);
    }
  };

  const revSubHandler = async () => {
    const files = fileInputRef?.current?.files;
    const formData = new FormData();
    if (files?.length! > 0) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }
    formData.append("comment", comment);
    formData.append("rating", String(rating));
    formData.append("product_id", productId);
    const { data } = await addReviewApi(formData);
    if (data.succuss) {
      handleRevModal();
      toast.success("review has been added");
    }
  };

  const handleOrderCancel = async () => {
    if (!order?.id) return;
    const { data } = await cancelOrderApi(order.id);
    console.log("cacel", data);

    if (data.success) {
      cancelModal();
    }
  };

  const orderPlaced = orderTracking?.status_history?.find((status) => {
    return status.status === "new";
  });
  const inProgressOrder = orderTracking?.status_history?.find((status) => {
    return status.status === "in_progress";
  });

  const shippedOrder = orderTracking?.status_history?.find((status) => {
    return status.status === "shipped";
  });
  const deliveredOrder = orderTracking?.status_history?.find((status) => {
    return status.status === "completed";
  });
  console.log("iam updated", orderTracking);

  const orderStatus = orderTracking?.status_history?.slice(-1)[0]?.status;

  if (status?.length > 0 && !status.includes(orderStatus)) return null;

  return (
    <>
      {" "}
      {order.products.map((prod) => (
        <>
          <div
            style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
            className="w-100 rounded-3xl p-6 mt-6 hover:border-[1px] border-[#F70000]"
          >
            <div className="flex items-center  justify-between">
              <div className="border-[1px] border-[#777777] rounded-full w-[230px] px-4 py-2 flex items-center">
                <IoLockClosed className="w-[14px] h-[14px] mr-2" />
                <p className="text-[14px] font-normal text-[#777777]">
                  {order.date}
                </p>
              </div>

              <div className="flex items-center mt-3 lg:mt-0 sm:mt-3 md:mt-2   ">
                {order.status !== "completed" && (
                  <button className=" lg:flex sm:hidden hidden items-center p-2 rounded-lg shadow-lg mr-3  cursor-pointer">
                    <IoCloseSharp
                      className="text-[24px] text-[#FC0005] mr-4 cursor-pointer"
                      onClick={cancelModal}
                    />
                    <p className="text-[#FC0005] text-[16px] font-semibold mr-4">
                      Cancel Orders
                    </p>
                  </button>
                )}
                {/* <div className="border-#00000017 border-[1px] rounded-md h-[30px] w-[30px] flex items-center justify-center">
                  <HiOutlineDotsVertical className="h-[15px] w-4 text-[#D9D9D9]" />
                </div> */}
              </div>
            </div>
            {order.status !== "completed" && (
              <button className=" lg:hidden sm:flex flex mt-4 sm:mt-2 lg:mt-0 items-center p-2 rounded-lg shadow-lg mr-3  cursor-pointer">
                <IoCloseSharp
                  className="text-[24px] text-[#FC0005] mr-4 cursor-pointer"
                  onClick={handleOpeneModel}
                />
                <p className="text-[#FC0005] text-[16px] font-semibold mr-4">
                  Cancel Order
                </p>
              </button>
            )}
            <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap  items-center justify-between mt-5">
              <div className="flex items-center">
                <div className="h-[100px] bg-[#F700000D] flex items-center justify-center w-[100px] rounded-2xl mr-5">
                  <Image
                    width={60}
                    height={60}
                    src={"/" + prod.featured_image}
                    alt="Product Image"
                    className="w-[60px] h-[60px]"
                  />
                </div>
                <div>
                  <p className="text-[18px] font-medium">{prod.title} </p>

                  {/* <p className="text-[16px] text-[#777777] mt-3 font-medium">
              Size 10.5 UK
            </p> */}
                </div>
              </div>
              <p className="lg:text-[24px] text-[18px] mt-3 lg:mt-0 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
                {prod.quantity}
              </p>
              <p className="lg:text-[24px] text-[18px] mt-3 lg:mt-0 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
                ₹{" "}
                {prod.discounted_price
                  ? prod.discounted_price
                  : prod.price * prod.quantity}
              </p>
              <div className="flex-col mt-3 lg:mt-0 sm:mt-3 md:mt-3  flex">
                <button className=" bg-[#00F7630F] rounded-2xl h-[50px] outline-[2px] outline-[#26F63B] outline-dashed  lg:w-[181px] w-[300px] sm:w-[300px] md:w-[300px] text-[18px] font-medium text-[#07D459]">
                  {orderTracking?.status_history?.slice(-1)[0].status}
                </button>
                {order.status !== "completed" && (
                  <button
                    className=" bg-[#FFFAF4] mt-3 outline-[2px] outline-[#F69B26] outline-dashed rounded-2xl h-[50px] lg:w-[181px] w-[300px] sm:w-[300px] md:w-[300px]  text-[18px] font-medium text-[#F69B26]"
                    onClick={handleButtonClick}
                  >
                    Order Tracking
                  </button>
                )}

                {order.status === "completed" && (
                  <button
                    className=" bg-[#FFFAF4] lg:mt-3 mt-0 outline-[2px] outline-[#F69B26] outline-dashed rounded-2xl h-[50px] lg:w-[181px] w-[130px] lg:w-[181px] sm:w-[100px]   lg:text-[18px] text-[14px] sm:text-[14px] font-medium text-[#F69B26]"
                    onClick={() => {
                      setProductId(prod.id);
                      handleRevModal();
                    }}
                  >
                    Leave Review
                  </button>
                )}
              </div>
            </div>
            {isDivVisible && (
              <>
                <div className="mt-4">
                  <p className="text-[16px] font-semibold">Delivery Details</p>
                </div>
                <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap  lg:gap-8 gap-2 sm:gap-2 mt-5">
                  <p className="text-[14px] text-[#909198] font-normal">
                    Delivery Details
                  </p>
                  <p className="text-[14px]  sm:ml-7 lg:ml-7  ml-10 text-black font-semibold">
                    {orderTracking.date}
                  </p>
                  <p className="text-[14px] text-[#909198] font-normal">
                    Tracking ID:
                  </p>
                  <p className="text-[14px] sm:ml-7 lg:ml-7  ml-10 text-black font-semibold">
                    {orderTracking.tracking_id}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-[16px] font-semibold">Delivery Details</p>
                </div>
                <div className="lg:flex  sm:hidden md:hidden hidden  gap-8 mt-5">
                  <div className="flex items-center gap-4 lg:w-auto w-[100%] sm: w-[100%] md: w-[100%]">
                    <Image src={AAA} alt="" className="w-[32px] h-[32px]" />
                    <div>
                      <p className="text-[14px] text-black font-semibold">
                        Order placed
                      </p>
                      <p className="text-[14px] text-[#909198] font-normal">
                        {orderTracking.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image src={BBB} alt="" className="w-[32px] h-[32px]" />
                    <div>
                      <p className="text-[14px] text-black font-semibold">
                        In Progress
                      </p>
                      <p className="text-[14px] text-[#909198] font-normal">
                        {inProgressOrder
                          ? new Date(
                              inProgressOrder.changed_at
                            ).toLocaleString()
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image src={CCC} alt="" className="w-[32px] h-[32px]" />
                    <div>
                      <p className="text-[14px] text-black font-semibold">
                        Shipped
                      </p>
                      <p className="text-[14px] text-[#909198] font-normal">
                        {shippedOrder
                          ? new Date(shippedOrder.changed_at).toLocaleString()
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image src={DDD} alt="" className="w-[32px] h-[32px]" />
                    <div>
                      <p className="text-[14px] text-black font-semibold">
                        Delivered
                      </p>
                      <p className="text-[14px] text-[#909198] font-normal">
                        {deliveredOrder
                          ? new Date(deliveredOrder.changed_at).toLocaleString()
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:flex  sm:hidden md:hidden hidden items-center  gap-3 mt-5">
                  <FaCheckCircle className="text-[#F70000] h-[24px] w-[24px]" />
                  <div
                    className={`${
                      inProgressOrder ? "border-[#F70000]" : "border-[#D2D4DA]"
                    } border-t-[2px] w-[200px] `}
                  />
                  <FaCheckCircle
                    className={`${
                      inProgressOrder ? "text-[#F70000]" : "text-[#D2D4DA]"
                    } h-[24px] w-[24px]`}
                  />
                  <div
                    className={`${
                      shippedOrder ? "border-[#F70000]" : "border-[#D2D4DA]"
                    } border-t-[2px] w-[200px] `}
                  />
                  <FaCheckCircle
                    className={`${
                      shippedOrder ? "text-[#F70000]" : "text-[#D2D4DA]"
                    } h-[24px] w-[24px]`}
                  />
                  <div
                    className={`${
                      deliveredOrder ? "border-[#F70000]" : "border-[#D2D4DA]"
                    } border-t-[2px] w-[200px] `}
                  />
                  <FaCheckCircle
                    className={`${
                      deliveredOrder ? "text-[#F70000]" : "text-[#D2D4DA]"
                    } h-[24px] w-[24px]`}
                  />{" "}
                </div>

                <div className="mt-5 sm:block block lg:hidden">
                  <div className="flex gap-3 items-start">
                    <div className="mt-2 ">
                      <FaCheckCircle className="text-[#F70000] h-[24px] w-[24px]" />

                      <div
                        className={`${
                          inProgressOrder
                            ? "border-[#F70000]"
                            : "border-[#D2D4DA]"
                        } ml-3 mt-2 border-l-[2px] h-[100px] `}
                      ></div>
                    </div>
                    <div className="flex items-center gap-4 lg:w-auto w-[100%] sm: w-[100%] md: w-[100%]">
                      <Image src={AAA} alt="" className="w-[32px] h-[32px]" />
                      <div>
                        <p className="text-[14px] text-black font-semibold">
                          Order placed
                        </p>
                        <p className="text-[14px] text-[#909198] font-normal">
                          {orderTracking.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="mt-2 ">
                      <FaCheckCircle
                        className={`${
                          inProgressOrder ? "text-[#F70000]" : "text-[#D2D4DA]"
                        } h-[24px] w-[24px]`}
                      />{" "}
                      <div
                        className={`${
                          shippedOrder ? "border-[#F70000]" : "border-[#D2D4DA]"
                        } ml-3 mt-2 border-l-[2px] h-[100px] `}
                      ></div>{" "}
                    </div>
                    <div className="flex items-center gap-4 lg:w-auto w-[100%] sm: w-[100%] md: w-[100%]">
                      <Image src={BBB} alt="" className="w-[32px] h-[32px]" />
                      <div>
                        <p className="text-[14px] text-black font-semibold">
                          In Progress
                        </p>
                        <p className="text-[14px] text-[#909198] font-normal">
                          {inProgressOrder
                            ? new Date(
                                inProgressOrder.changed_at
                              ).toLocaleString()
                            : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="mt-2 ">
                      <FaCheckCircle
                        className={`${
                          shippedOrder ? "text-[#F70000]" : "text-[#D2D4DA]"
                        } h-[24px] w-[24px]`}
                      />{" "}
                      <div
                        className={`${
                          deliveredOrder
                            ? "border-[#F70000]"
                            : "border-[#D2D4DA]"
                        } ml-3 mt-2 border-l-[2px] h-[100px] `}
                      ></div>{" "}
                    </div>
                    <div className="flex items-center gap-4 lg:w-auto w-[100%] sm: w-[100%] md: w-[100%]">
                      <Image src={CCC} alt="" className="w-[32px] h-[32px]" />
                      <div>
                        <p className="text-[14px] text-black font-semibold">
                          Shipped
                        </p>
                        <p className="text-[14px] text-[#909198] font-normal">
                          {shippedOrder
                            ? new Date(shippedOrder.changed_at).toLocaleString()
                            : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="mt-2 ">
                      <FaCheckCircle
                        className={`${
                          deliveredOrder ? "text-[#F70000]" : "text-[#D2D4DA]"
                        } h-[24px] w-[24px]`}
                      />{" "}
                    </div>
                    <div className="flex items-center gap-4 lg:w-auto w-[100%] sm: w-[100%] md: w-[100%]">
                      <Image src={DDD} alt="" className="w-[32px] h-[32px]" />
                      <div>
                        <p className="text-[14px] text-black font-semibold">
                          Delivered
                        </p>
                        <p className="text-[14px] text-[#909198] font-normal">
                          {deliveredOrder
                            ? new Date(
                                deliveredOrder.changed_at
                              ).toLocaleString()
                            : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <CustomModal showModal={isModalVisible}>
            <div className="w-[600px]  my-[40px]">
              <div className="flex flex-col justify-center text-center">
                <Image
                  src={close}
                  alt=""
                  className="text-[#E13827] flex m-auto h-[162px] w-[162px]"
                />
                <p className="text-[32px] text-[#434343]  font-bold mt-6">
                  Cancel Order
                </p>
                <p className="text-[20px] text-[#434343]  font-medium mt-6">
                  Are you sure you want to cancel the order
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    className=" bg-[#CFCFCF] rounded-md h-[50px]  w-[181px] text-[18px] font-medium text-white"
                    onClick={cancelModal}
                  >
                    Cancel
                  </button>
                  <button
                    className=" bg-[#F70000]  rounded-md h-[50px]  w-[181px] text-[18px] font-medium text-white"
                    onClick={handleOrderCancel}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </CustomModal>

          <CustomModal showModal={showleave}>
            <div className="flex-col justify-center w-[800px]">
              <div className="w-[100%] rounded-[30px] p-[30px]">
                <p className="text-[40px]  font-medium">Write a Review</p>
                <p className="text-[20px]  font-semibold  mt-3">
                  Rate the Product
                </p>
                <Rating
                  name="read-only"
                  mt-3
                  defaultValue={5}
                  value={rating}
                  onChange={(_, val) => setRating(val as number)}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 50,
                    },
                  }}
                />

                <div className="mt-5">
                  <label className="text-[16px] font-semibold text-[#777777]">
                    Messsage
                  </label>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    className="border-[1px] border-[#0000061] resize-none  w-full rounded-md h-[100px] p-3 focus:outline-none placeholder:text-[#777777]"
                    placeholder="Messsage"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 mt-5">
                  {selectedImages.length > 0 &&
                    selectedImages.map((image, index) => (
                      <Image
                        width={130}
                        height={130}
                        key={index}
                        src={image}
                        className="rounded-2xl w-[130px] h-[130px]"
                        alt=""
                      />
                    ))}
                  <div className=" w-[130px] h-[130px] border-[3px] rounded-2xl border-[#F70000] flex justify-center items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                    <PiCameraThin
                      className="h-[90px] w-[90px] text-[#F70000]"
                      onClick={handleIconClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="flex mt-5 items-center gap-6">
                  <button
                    className=" bg-[#F70000] rounded-xl h-[50px]  mt-[30px] w-[230px] text-[18px] font-medium text-white"
                    onClick={revSubHandler}
                  >
                    Submit
                  </button>
                  <button
                    className=" bg-[#F69B26] rounded-xl h-[50px] mt-[30px] w-[230px] text-[18px] font-medium text-white"
                    onClick={handleRevModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </CustomModal>
        </>
      ))}
    </>
  );
};

export default MyorderCard;
