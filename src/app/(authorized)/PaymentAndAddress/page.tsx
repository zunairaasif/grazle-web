"use client";
import React, { useEffect, useState } from "react";
import airpod from "@/assets/airpod.png";
import Delivery from "@/assets/Group 1820549945.png";
import FedEx from "@/assets/image 9.png";
import card from "@/assets/credit-card (3) 1.png";
import visa from "@/assets/pngwing 7.png";
import Cash from "@/assets/image 12.png";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import { IoLocationOutline } from "react-icons/io5";
import { Checkbox, Radio } from "@mui/material";
import { FaCircleCheck } from "react-icons/fa6";
import CustomModal from "@/components/CustomModel";
import Dots from "@/assets/Group 1820549907.png";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/features/features";
import {
  ccavCheckoutApi,
  ccavResponseApi,
  editAddressApi,
  getAddressByIdApi,
  getProfileApi,
  payWithPaypalApi,
  placeOrderApi,
} from "@/apis";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";

export default function PaymentAndAddress() {
  const [isChecked, setIsChecked] = useState(false);
  const [showSendModel, setShowSendModel] = useState(false);
  const [addressDetail, setAddressDetail] = useState({});
  const [isPending, setPending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [otherFields, setOtherFields] = useState({});
  const [loading, setLoading] = useState(false);

  const [creditcardData, setCreditCardData] = useState({
    cardType: "Credit Card",
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    nameOfCard: "",
  });

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const cartTotal = useSelector((state) => state.cartTotal);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e) => {
    setCreditCardData({
      ...creditcardData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const addressId = searchParams.get("addressId");
    if (!addressId) return router.back();
    !cartProducts.length && dispatch(updateCart({ type: "onRefresh" }));
    (async () => {
      const { data } = await getAddressByIdApi(addressId);
      setAddressDetail(data?.address);
    })();
  }, []);

  if (!searchParams.get("addressId")) {
    return null;
  }
  // console.log(value);
  // const handleRadioChange = (value) => {
  //   setPaymentMethod(value);
  //   // setIsChecked(!isChecked);
  // };

  // const handleOpeneMode = () => {
  //   setShowSendModel(true);
  // };
  const handleCloseModel = () => {
    setShowSendModel(false);
  };

  async function onEditAddress(formdata) {
    const addressId = searchParams.get("addressId");
    if (!addressId) return;
    try {
      setPending(true);
      const { data } = await editAddressApi(formdata, addressId);

      setAddressDetail(data?.address);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }

  function onChangeFields(e) {
    const name = e.target.name;
    const value = e.target.value;
    setOtherFields({ [name]: value });
  }

  async function onPayment(data) {
    setLoading(true);

    if (paymentMethod === "creditcard") {
      if (
        creditcardData.nameOfCard === "" ||
        creditcardData.cardName === "" ||
        creditcardData.cardNumber === "" ||
        creditcardData.expiryMonth === "" ||
        creditcardData.expiryYear === "" ||
        creditcardData.cvv === ""
      ) {
        toast.error("All fields are required");
      }
    }

    const formdata = new FormData();
    const productIds = [];
    const productQty = [];
    try {
      const addressId = searchParams.get("addressId");
      cartProducts?.map((item) => {
        productIds.push(item?.id);
        productQty.push(item?.qty);
      });
      if (
        !addressId ||
        !paymentMethod ||
        !productQty?.length ||
        !productIds?.length
      )
        return toast.error(
          "Missing address / payment method / product detail "
        );
      // const isPaid = paymentMethod === "cod" ? "notpaid" : "paid";
      formdata.append("address_id", addressId);
      formdata.append(
        "payment_type",
        paymentMethod === "cod" ? "cod" : "online"
      );
      formdata.append("quantities", productQty);
      formdata.append("coupon_code", otherFields?.coupon_code);
      formdata.append("discount", otherFields?.discount);
      formdata.append("payment", "notpaid");
      formdata.append("transaction_id", otherFields?.transaction_id);
      formdata.append("product_ids", productIds);

      const { data } = await placeOrderApi(formdata);
      const userData = await getProfileApi();
      if (data.success && paymentMethod === "paypal") {
        const billingData = new FormData();
        billingData.append("order_id", data.order.reference_id);
        billingData.append("name", userData.data.user.username);
        billingData.append("amount", cartTotal);
        billingData.append("address", JSON.stringify(addressDetail));
        const response = await payWithPaypalApi(billingData);
        // console.log("response", response);
        const resData = new FormData();
        resData.append("enc_resp", response.data.encryptedData);
        const ccavRes = await ccavResponseApi(resData);
        router.replace(response.data.url);
      }
      if (data.success && paymentMethod === "creditcard") {
        const formdata = new FormData();
        formdata.append("name", creditcardData.cardName);
        formdata.append("card_name", creditcardData.nameOfCard);
        formdata.append("card_number", creditcardData.cardNumber);
        formdata.append("card_type", creditcardData.cardType);
        formdata.append("expiry_month", creditcardData.expiryMonth);
        formdata.append("expiry_year", creditcardData.expiryYear);
        formdata.append("cvv_number", creditcardData.cvv);
        formdata.append("order_id", data.order.reference_id);
        formdata.append("amount", cartTotal);
        formdata.append(
          "payment_option",
          creditcardData.cardType === "Credit Card" ? "OPTCRDC" : "OPTDBCRD"
        );
        formdata.append("address", JSON.stringify(addressDetail));
        const checkOutResponse = await ccavCheckoutApi(formdata);
        const resData = new FormData();
        resData.append("enc_resp", checkOutResponse.data.encryptedData);
        const ccavRes = await ccavResponseApi(resData);
        console.log("first response", checkOutResponse);
        router.replace(checkOutResponse.data.url);
      }
      setLoading(false);
      setShowSendModel(paymentMethod === "cod");
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="lg:my-[50px] my-[20px] sm:my-[20px] md:my-[30px] lg:mx-[150px] mx-[10px] sm:mx-[10px] md:mx-[30px] flex  flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-start gap-8">
      <div className="lg:w-[70%] w-[100%] sm:w-[100%] md:w-[100%] rounded-3xl p-[20px] ">
        <form
          action={onEditAddress}
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="w-[100%] rounded-3xl p-[20px] "
        >
          <div className="flex items-center">
            <IoLocationOutline className=" w-[33px] h-[46px] mr-3" />
            <p className="text-[40px] font-bold">Shipping Address</p>
          </div>
          <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center gap-4 mt-6">
            <div className="flex-col ">
              <label className="text-[16px] font-normal text-[#7777777]">
                First Name
              </label>
              <input
                name="recipient_name"
                defaultValue={addressDetail?.recipient_name}
                className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
              />
            </div>
            <div className="flex-col ">
              <label className="text-[16px] font-normal text-[#7777777]">
                Address Label
              </label>
              <input
                name="address_label"
                defaultValue={addressDetail?.address_label}
                className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-col mt-6">
            <label className="text-[16px] font-normal text-[#7777777]">
              Street Address
            </label>
            <input
              name="address"
              defaultValue={addressDetail?.address}
              className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center gap-4 mt-6">
            <div className="flex-col ">
              <label className="text-[16px] font-normal text-[#7777777]">
                Phone
              </label>
              <input
                name="recipient_phone"
                defaultValue={addressDetail?.recipient_phone}
                className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
              />
            </div>
            <div className="flex-col">
              <label className="text-[16px] font-normal text-[#7777777]">
                Note
              </label>
              <input
                name="note"
                defaultValue={addressDetail?.note}
                className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-7 flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center">
            <button
              disabled={isPending}
              className="lg:mr-4 mr-0 disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none  bg-[#D2D4DA] rounded-md h-[50px]  lg:w-[150px] w-[100%] sm:w-[100%] text-[18px] font-medium text-white"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              className=" bg-[#F70000] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none  mt-4 lg:mt-0 rounded-md h-[50px]  lg:w-[210px] w-[100%] sm:w-[100%]  text-[18px] font-medium text-white"
            >
              Use this Addresss
            </button>
          </div>
        </form>
        <div
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="w-[100%] rounded-3xl p-[20px] mt-4 "
        >
          <div className="flex items-center gap-2">
            <Image src={Delivery} alt="Airpod" className=" w-[54px] h-[32px]" />
            <p className="lg:text-[40px] text-[24px] sm:text-[24px] font-medium ">
              Delivery Partner
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Image src={FedEx} alt="Airpod" className=" w-[74px] h-[32px]" />
            <p className="text-[24px] font-medium ">Delivery Partner</p>
          </div>
        </div>
        {/* payment method */}
        <form
          action={onPayment}
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="w-[100%] rounded-3xl p-[20px] mt-4 "
        >
          <div className="flex items-center gap-2 mt-2">
            <Image
              src={card}
              alt="Airpod"
              className=" w-[42px] h-[42px] mr-2"
            />
            <p className="lg:text-[40px] text-[24px] sm:text-[24px] font-medium ">
              All Payment Options
            </p>
          </div>
          <div
            className={`border-[1px] mt-3 p-3 rounded-xl ${
              paymentMethod === "creditcard"
                ? "border-[#F70000] bg-[rgb(255,229,229)]"
                : "border-[#777777]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio
                checked={paymentMethod === "creditcard" ? true : false}
                onChange={() => setPaymentMethod("creditcard")}
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
              <p className="text-[18px] font-medium">Cards</p>
            </div>
            <p className="text-[16px] font-medium text-[#777777]">
              Pay securely using your visa, maestro, Discover, or American
              express card.
            </p>
            <div className="flex-col mt-6">
              <label className="text-[16px] font-normal text-[#777777]">
                Card Number
              </label>
              <input
                maxLength={16}
                name="cardNumber"
                className="border-[1px] mt-[9px] border-[#777777] w-full rounded-md h-[50px] p-3 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center gap-4 mt-6">
              <div className="flex-col">
                <label className="text-[16px] font-normal text-[#777777]">
                  Card Holder
                </label>
                <input
                  name="cardName"
                  className="border-[1px] mt-[9px] border-[#777777] w-full rounded-md h-[50px] p-3 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-col">
                <label className="text-[16px] font-normal text-[#777777]">
                  Card Name
                </label>
                <input
                  name="nameOfCard"
                  className="border-[1px] mt-[9px] border-[#777777] w-full rounded-md h-[50px] p-3 focus:outline-none"
                  onChange={handleChange}
                />
              </div>

              <div className="flex-col">
                <label className="text-[16px] font-normal text-[#777777]">
                  Card Type{" "}
                </label>
                <select
                  name="cardType"
                  value={creditcardData.cardType}
                  onChange={handleChange}
                  className="border-[1px] mt-[9px] border-[#777777] w-full rounded-md h-[50px] p-3 focus:outline-none"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center gap-4 mt-6">
              <div className="flex-col">
                <label className="text-[16px] font-normal text-[#777777]">
                  Expiry Year
                </label>
                <input
                  name="expiryYear"
                  className="border-[1px] mt-[9px] border-[#777777] w-full rounded-md h-[50px] p-3 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-col">
                <label className="text-[16px] font-normal text-[#777777]">
                  Expiry Month
                </label>
                <input
                  name="expiryMonth"
                  className="border-[1px] mt-[9px] border-[#777777] w-full rounded-md h-[50px] p-3 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-col">
                <label className="text-[16px] font-normal text-[#777777]">
                  CVC Number
                </label>
                <input
                  maxLength={3}
                  name="cvc"
                  className="border-[1px] mt-[9px] border-[#777777] w-full rounded-md h-[50px] p-3 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div
            className={`border-[1px] mt-4 p-3 flex items-center justify-between rounded-xl w-full ${
              paymentMethod === "paypal"
                ? "border-[#F70000]"
                : "border-[#777777]"
            }`}
          >
            <div className="flex items-center">
              <Radio
                sx={{
                  color: "#F70000",
                  "& .MuiSvgIcon-root": {
                    fontSize: 24,
                  },
                  "&.Mui-checked": {
                    color: "#F70000",
                  },
                }}
                checked={paymentMethod === "paypal" ? true : false}
                onChange={() => setPaymentMethod("paypal")}
              />
              <p className="text-[18px] font-medium ml-2 ">Visa</p>
            </div>
            <Image src={visa} alt="visa" className=" w-[42px] h-[42px] mr-2" />
          </div>

          <div
            className={`border-[1px] mt-4 p-3 flex items-center justify-between rounded-xl w-full  ${
              paymentMethod === "cod" ? "border-[#F70000]" : "border-[#777777]"
            }`}
          >
            <div className="flex items-center">
              <Radio
                sx={{
                  color: "#F70000",
                  "& .MuiSvgIcon-root": {
                    fontSize: 24,
                  },
                  "&.Mui-checked": {
                    color: "#F70000",
                  },
                }}
                checked={paymentMethod === "cod" ? true : false}
                onChange={() => setPaymentMethod("cod")}
              />
              <p className=" ">Cash on Delivery</p>
            </div>
            <Image src={Cash} alt="visa" className=" w-[43px] h-[30px] mr-2" />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className=" mt-10 bg-[#F70000] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-md h-[50px]  w-[100%] text-[18px] font-medium text-white"
            // onClick={handleOpeneMode}
          >
            {paymentMethod === "cod" ? (
              "Place Order"
            ) : (
              <>Pay ₹{cartTotal.toFixed(0)} </>
            )}

            {loading && <BiLoader className="animate-spin ml-4" />}
          </button>
          <div className="mt-3 flex items-center">
            <Checkbox
              sx={{
                color: "#FF8A1D",
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                },
                "&.Mui-checked": {
                  color: "#FF8A1D",
                },
              }}
            />
            <p className="text-[18px] font-medium ml-2  text-[#777777]">
              By Clicking this, I agree all Terms & Conditions and Privacy &
              Ploicy
            </p>
          </div>
        </form>
      </div>
      {/* hello */}

      <div className="lg:w-[30%] w-[100%] sm:w-[100%] md:w-[100%] h-auto">
        <div
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="w-full rounded-3xl p-5"
        >
          <p className="text-[16px] font-medium text-[#777777]">
            We will contact you to confirm order
          </p>
          <input
            className="border-[1px] mt-4 border-[#0000061]  w-full rounded-xl h-[50px] p-3 focus:outline-none placeholder:text-[#777777]"
            placeholder="Name"
            name="username"
            onChange={(e) => onChangeFields(e)}
          />
        </div>
        <div
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="w-full rounded-3xl p-5 mt-5 relative"
        >
          <p className="text-[16px] font-medium text-[#777777]">
            Have a Coupen
          </p>
          <button className="absolute bg-[#F70000] right-8 top-[68px] rounded-md h-[35px]  w-[70px] text-[18px] font-medium text-white">
            Add
          </button>
          <input
            name="coupon_code"
            onChange={(e) => onChangeFields(e)}
            className="border-[1px] mt-4 border-[#0000061]  w-full rounded-xl h-[50px] p-3 focus:outline-none placeholder:text-[#777777]"
            placeholder="Add Coupen"
          />
        </div>
        <div
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="w-full h-full rounded-3xl p-5 mt-5 relative"
        >
          {cartProducts?.map((item) => (
            <div
              key={item.id}
              className="mt-[0px] flex items-center justify-between"
            >
              <div className="relative w-[90px] h-[90px]  mr-2">
                <Badge badgeContent={item.qty} color="primary" className="mr-3">
                  <Image
                    src={item.featured_image}
                    height={50}
                    width={50}
                    alt={item.title}
                    className="rounded-2xl w-full h-full"
                  />
                </Badge>
              </div>
              <div className="flex items-center ">
                <p className="text-[16px] font-medium text-black mr-2">
                  {item.title}
                </p>
                {/* <p className="text-[13px] font-medium text-[#777777] mr-2">
                  White
                </p> */}
              </div>
              <p className="text-[16px] font-medium text-[#777777]">
                ₹
                {item.discount
                  ? item.discounted_price * item.qty
                  : item.price * item.qty}
              </p>
            </div>
          ))}

          <div className="mt-5 border-b-[1px] border-[#777777]"></div>
          <p className="text-[24px] font-medium text-blackmt-2">Cart Total</p>
          <div className="flex items-center mt-4 justify-between">
            <p className="text-[18px] font-medium text-[#777777] ">
              Cart Subtotal
            </p>
            <p className="text-[18px] font-bold text-[#777777] ">
              ₹{cartTotal}
            </p>
          </div>
          <div className="flex items-center mt-4 justify-between">
            <p className="text-[18px] font-medium text-[#777777] ">Shipping</p>
            <p className="text-[18px] font-bold text-black ">Free</p>
          </div>
          {/* TODO:add images and discount here */}
          <div className="flex items-center mt-4 justify-between">
            <p className="text-[18px] font-medium text-[#777777] ">Discount</p>
            <p className="text-[18px] font-bold text-black ">
              {cartProducts
                .reduce(
                  (acc, item) =>
                    acc + item.discount
                      ? item.price
                      : 0 * item.qty - item.discounted_price * item.qty,
                  0
                )
                .toFixed(0)}
            </p>
          </div>
          <div className="my-5 border-b-[1px] border-[#777777]"></div>
          <div className="flex items-center mt-4 justify-between">
            <p className="text-[18px] font-bold text-black ">Cart Total</p>
            <p className="text-[18px] font-bold text-[#777777] ">
              ₹{cartTotal.toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      <CustomModal showModal={showSendModel}>
        <div className="flex-col justify-center w-[900px]">
          <div className="mx-[150px]  my-[100px]">
            <div className="flex justify-center mb-[22px]">
              <Image src={Dots} alt="" className="h-[64px] w-[64px]" />

              <FaCircleCheck className="text-[#E24C4B] h-[105px] mx-[16px] w-[105px]" />
              <Image src={Dots} alt="" className="h-[64px] w-[64px]" />
            </div>
            <p className="mt-5 text-[32px] text-center font-semibold text-[#434343]">
              Your order has been successfully placed
            </p>
            <p className=" mt-3 text-[16px] text-center font-semibold text-[#434343]">
              We will be sending you an email confirmation to your email shortly
            </p>
            <div className="flex mt-[30px] mb-[100px] gap-4 justify-center">
              {/* <button
                className=" bg-[#F70000] rounded-lg h-[50px] w-[275px] text-white font-medium"
                onClick={handleCloseModel}
              >
                Leave a Review
              </button> */}
              <button
                className=" bg-[#F69B26] rounded-lg h-[50px] w-[275px] text-white font-medium"
                onClick={handleCloseModel}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
