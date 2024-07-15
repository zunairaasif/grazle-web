"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Product from "@/assets/Product Image.png";
import logo from "@/assets/Grazle Logo.png";
import Star from "@/assets/Star 1.png";
import Cart from "@/assets/CartVector.png";
import Like from "@/assets/Frame 1820551183.png";
import { Box, IconButton, Rating } from "@mui/material";
import LinearProgress from "@mui/joy/LinearProgress";
import Card1 from "@/assets/a5a6296b2158604a47215a2b0a00bde0.png";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline, IoIosHeartEmpty } from "react-icons/io";
import Logoo from "@/assets/Grazle Logo.png";
import { FaAngleDown, FaStar } from "react-icons/fa6";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import {
  addSuggestedProductsApi,
  favoriteProductApi,
  getBrandDetails,
  getBrandProductsApi,
  getProductBySlugApi,
} from "@/apis";
import ReviewCard from "@/components/ReviewCard";
import ProductCard from "@/components/ProductCard";
import { useDispatch } from "react-redux";
import { updateCart } from "@/features/features";
import { calculateDiscountPercentage } from "@/utils";
export default function ProductDetail() {
  const [count, setCount] = useState(1);
  const [singleProduct, setSingleProduct] = useState({});
  const [brandId, setBrandId] = useState(0);
  const [currentProductId, setCurrentProductId] = useState("");
  const [storeProductsDetails, setStoreProductsDetails] = useState([]);
  const dispatch = useDispatch();
  const [currentStore, setCurrentStore] = useState({});
  const [currentVariant, setCurrentVariant] = useState("");

  const [isPending, setPending] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const router = useRouter();
  const { slug } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await getProductBySlugApi(slug);
      setSingleProduct(data?.product);
    })();
  }, []);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const goToShop = () => {
    router.push("/StoreProduct?id=" + singleProduct.brand_id);
  };
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    (async () => {
      if (!singleProduct.brand_id) return;
      const { data } = await getBrandProductsApi(singleProduct.brand_id);

      setStoreProductsDetails(data.products);
      const res = await getBrandDetails(singleProduct.brand_id);
      setCurrentStore(res.data.store);
    })();
  }, [singleProduct.brand_id]);

  const onAddingCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: any
  ) => {
    e.stopPropagation();
    setCurrentProductId(product.id);
    const updateProduct = { ...product, qty: count };
    dispatch(updateCart({ type: null, product: updateProduct }));
  };

  useEffect(() => {
    (async () => {
      const { data } = await addSuggestedProductsApi(
        currentProductId,
        "purchase"
      );
    })();
  }, [currentProductId]);

  async function onLiked(
    e: React.MouseEvent<HTMLButtonElement>,
    productId: any
  ) {
    e.stopPropagation();
    if (isPending) return; //purpose : to avoid user from calling multiple api

    try {
      setPending(true);
      const formdata = new FormData();
      formdata.append("product_id", productId);
      const favoriteProductIds = [...favoriteProducts];
      if (favoriteProductIds.includes(productId)) {
        let filterArray = favoriteProductIds.filter(
          (itemId) => itemId !== productId
        );
        setFavoriteProducts(filterArray);
      } else {
        setFavoriteProducts([...favoriteProductIds, productId]);
      }
      await favoriteProductApi(formdata);
    } catch (error) {
      console.log("error in liking product");
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 200);
    }
  }

  const excellentRating =
    (singleProduct?.total_rating?.total_excellent_count /
      singleProduct?.total_rating?.total_rating_count) *
    100;
  const topVgRating =
    (singleProduct?.total_rating?.total_verygood_count /
      singleProduct?.total_rating?.total_rating_count) *
    100;
  const goodRating =
    (singleProduct?.total_rating?.total_good_count /
      singleProduct?.total_rating?.total_rating_count) *
    100;
  const averageRating =
    (singleProduct?.total_rating?.total_average_count /
      singleProduct?.total_rating?.total_rating_count) *
    100;

  const poorRating =
    (singleProduct?.total_rating?.total_poor_count /
      singleProduct?.total_rating?.total_rating_count) *
    100;

  console.log(singleProduct);
  return (
    <>
      <div className="lg:my-[50px] my-[20px] sm:my-[20px] md:my-[30px] lg:mx-[150px] mx-[20px] sm:mx-[20px] md:mx-[30px]">
        <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap justify-between">
          <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[40%]">
            <Image
              alt=""
              height={350}
              width={350}
              src={singleProduct?.featured_image}
              className="w-full h-[350px]  sm:[400px] md:[400px] lg:h-[500px]"
            />{" "}
            <div className="flex justify-between">
              {singleProduct?.gallery?.map((item, index) => {
                return (
                  <Image
                    key={index}
                    alt=""
                    width={90}
                    height={90}
                    src={item?.image}
                    className="lg:w-[90px]  lg:h-[90px] h-[60px] sm:h-[60px] md:h-[60px] w-[60px] sm:w-[60px] md:w-[60px] hover:border-[1px] border-[#F70000]"
                  />
                );
              })}
            </div>
          </div>
          <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[50%]">
            <p className="lg:text-[32px] text-[24px] sm:text-[24px] md:text-[24px]  font-semibold">
              {singleProduct.title}
            </p>
            <div className="flex mt-2 items-center gap-2">
              <Rating
                name="read-only"
                precision={0.1}
                mt-3
                defaultValue={Number(
                  singleProduct?.total_rating?.average_rating
                )}
                value={Number(singleProduct?.total_rating?.average_rating)}
                readOnly
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                }}
              />
              <p className="text-[14px] text-[#666666] font-normal">
                {singleProduct?.total_rating?.total_rating_count} Review
              </p>
              {/* <p className="text-[16px]  mx-5 font-normal">.</p>
              <p className="text-[14px]  font-normal">SKU:</p>

              <p className="text-[14px] text-[#666666] font-normal">2,51,594</p> */}
            </div>
            <div className="mt-3">
              <p className="text-[32px] text-[#F70000] font-bold">
                ₹
                {singleProduct?.discount
                  ? singleProduct.discounted_price
                  : singleProduct.price}
              </p>
            </div>
            <div className="flex flex-col text-start justify-start  gap-2 pb-8 border-b-[1px] border-[#0000001A]">
              <p className="text-[16px]  text-[#909198] font-normal line-through">
                ₹ {singleProduct?.discount ? singleProduct?.price : 0}
              </p>
              <p className="text-[16px] text-[#4FAD2E] font-normal">
                {singleProduct?.discount
                  ? calculateDiscountPercentage(
                      singleProduct?.price,
                      singleProduct.discounted_price
                    )
                  : 0}
                %off
              </p>
            </div>
            <div className="mt-4">
              <p className="text-[14px] text-[#000000] font-semibold">
                Variants
              </p>
              <div className="flex flex-wrap sm:flex-wrap  md:flex-wrap lg:flex-nowrap items-center justify-between mt-2 gap-3">
                <div className="flex items-center  gap-3">
                  {singleProduct?.variants?.map((item, index) => {
                    return (
                      <div
                        onClick={() => setCurrentVariant(item.id)}
                        key={index}
                        className={`py-2 px-3 bg-[#FEF2F2] rounded-lg border-[1px] ${
                          currentVariant === item.id
                            ? " border-[#F70000] text-[#F70000]"
                            : "border-[#E6E6E6]"
                        } `}
                      >
                        {item.variant}
                      </div>
                    );
                  })}
                </div>
                <div className="w-[124px] rounded-full border-[1px] border-[#E6E6E6] p-2 flex items-center justify-between">
                  <div
                    className="w-[34px] h-[34px] rounded-full bg-[#F2F2F2] flex items-center cursor-pointer justify-center"
                    onClick={handleDecrement}
                  >
                    <HiOutlineMinus className="text-[16px] font-bold" />
                  </div>
                  <p className="text-[16px] font-bold">{count}</p>
                  <div
                    className="w-[34px] h-[34px] rounded-full bg-[#F2F2F2] flex items-center cursor-pointer justify-center"
                    onClick={handleIncrement}
                  >
                    <HiOutlinePlus className="text-[16px] font-bold" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-[#F70000] rounded-full h-[50px] mt-[20px] lg:w-[275px] w-[200px] sm:w-[200px] md:w-[200px] font-medium text-white"
                  onClick={(e) => {
                    handleClick();
                    onAddingCart(e, singleProduct);
                  }}
                >
                  Add to cart
                </button>
                {showPopup && (
                  <div className="bg-[#F8F8F8] absolute top-[250px] right-0 h-[50px] shadow-lg  w-[350px] flex items-center">
                    <div className="rounded-l-lg bg-[#4FAD2E] w-3  h-[50px]"></div>

                    <div className="mx-4 flex items-center gap-6">
                      <IoIosCheckmarkCircleOutline className="text-[#4FAD2E] text-[20px]" />

                      <p className="text-black text-[14px] font-semibold">
                        The Item has added into cart
                      </p>
                    </div>
                  </div>
                )}
                <button className="border-[1px] border-[#F70000] rounded-full h-[50px] mt-[20px] lg:w-[275px] w-[200px] sm:w-[200px] md:w-[200px]  font-medium text-[#F70000]">
                  Get Started
                </button>
                <div className="flex justify-center mt-[20px] items-center rounded-full bg-[#F8F8F8] h-[52px] w-[52px] ">
                  <IconButton
                    size="medium"
                    onClick={(e) => onLiked(e, singleProduct?.id)}
                  >
                    {favoriteProducts?.includes(singleProduct.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaHeart className="text-zinc-500" />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="rounded-2xl mt-4 border-[1px] border-[#E6E6E6] px-4 py-2">
                <div className="flex justify-between items-center pb-3 border-b-[1px] border-[#0000000D]">
                  <div className="flex gap-4 items-center">
                    <div className="flex justify-center  items-center rounded-full bg-[#F8F8F8] h-[52px] w-[52px] ">
                      <Image
                        alt=""
                        width={30}
                        height={20}
                        src={"/" + currentStore?.store_image}
                        className="w-[30px] h-[20px] "
                      />
                    </div>
                    <p className="text-[14px] text-[#000000] font-semibold">
                      {currentStore?.store_name}
                    </p>
                  </div>
                  <button
                    className="border-[1px] border-[#F70000] text-[10px] rounded-full h-[25px] w-[85px] font-medium text-[#F70000]"
                    onClick={goToShop}
                  >
                    view shop
                  </button>
                </div>
                <div className="flex items-center justify-evenly mt-5 ">
                  <div>
                    <div className="flex items-center gap-2 justify-center">
                      <FaStar className="text-[#FFB33E] text-[16px]" />
                      <p className="text-[#000000] text-[14px] font-bold">
                        {currentStore.store_rating}
                      </p>
                      <p className="text-[#777777] text-[14px]">
                        ({currentStore.store_reviews} )
                      </p>
                    </div>
                    <p className="text-[#777777] text-center text-[12px]">
                      Ratings
                    </p>
                  </div>
                  <div className="border-r-[1px] border-[#0000000D] h-[30px]"></div>{" "}
                  <div>
                    <div className="flex items-center gap-2 justify-center">
                      <p className="text-[#000000] text-[14px] font-bold">
                        {currentStore.store_products}
                      </p>
                    </div>
                    <p className="text-[#777777] text-center text-[12px]">
                      products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 items-center pb-2 gap-4 border-b-[1px] border-[##E5E5E5]">
          <p className="text-[#F70000] text-[14px] font-semibold">
            Descriptions
          </p>
          <p className="text-[#777777] text-[14px] font-semibold">
            Product info
          </p>
          <p className="text-[#777777] text-[14px] font-semibold">Faq</p>
        </div>
        <div className="mt-4">
          <p className="text-[#808080] text-[14px] font-normal">
            {singleProduct?.description}
          </p>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-[14px] text-[#F70000]" />
            <p className="text-[14px] text-[#808080] font-normal">
              100 g of fresh leaves provides.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <FaCheckCircle className="text-[14px] text-[#F70000]" />
            <p className="text-[14px] text-[#808080] font-normal">
              Aliquam ac est at augue volutpat elementum.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <FaCheckCircle className="text-[14px] text-[#F70000]" />
            <p className="text-[14px] text-[#808080] font-normal">
              Quisque nec enim eget sapien molestie.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <FaCheckCircle className="text-[14px] text-[#F70000]" />
            <p className="text-[14px] text-[#808080] font-normal">
              Proin convallis odio volutpat finibus posuere.
            </p>
          </div>
          <p className="text-[14px] mt-3 lg:w-[650px] w-[100%] sm:w-[100%] md:w-[100%] text-[#808080] font-normal">
            Cras et diam maximus, accumsan sapien et, sollicitudin velit. Nulla
            blandit eros non turpis lobortis iaculis at ut massa. .
          </p>
        </div>
        <div className="w-100% rounded-2xl mt-5  border-[1px] border-[#0000001A]">
          <div className="bg-[#D9D9D91A] p-2 text-[#000000]">
            <p className="text-[20px] rounded-t-2xl text-[#000000] font-bold">
              Ratings & Reviews
            </p>
          </div>
          <div className="py-3 px-10 flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap  items-center  border-b-[1px]  border-[#0000001A]">
            <div className="mt-5">
              <div className="flex items-center gap-4">
                <p className="text-[18px] font-semibold">
                  {singleProduct?.total_rating?.average_rating}
                </p>
                <div className="bg-[#F69B26] flex gap-2 h-[24px] w-[150px] items-center text-white px-2">
                  <FaCheckCircle className="text-[14px] text-white" />
                  <p className=" text-[14px] text-white p-2">Very Good</p>
                </div>
              </div>
              <div className="mt-3">
                <Rating
                  precision={0.5}
                  name="read-only"
                  mt-3
                  defaultValue={Number(
                    singleProduct?.total_rating?.average_rating
                  )}
                  value={
                    Number(singleProduct?.total_rating?.average_rating)
                      ? Number(singleProduct?.total_rating?.average_rating)
                      : 0
                  }
                  readOnly
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </div>
              <p className="text-[10px] mt-2 text-[#434343] font-semibold">
                {singleProduct?.total_rating?.total_rating_count} Rating
              </p>
            </div>
            <div className="border-l-[2px] border-l-[0px] sm:border-l-[0px] md:border-l-[0px] border-[#0000001A] mx-10 h-[100px]"></div>
            <div>
              <div className="flex items-center gap-4">
                <Rating
                  name="read-only"
                  mt-3
                  defaultValue={5}
                  readOnly
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
                <div className="lg:w-[270px] w-[130px] md:w-[130px] sm:w-[130px]">
                  <LinearProgress
                    color="warning"
                    determinate
                    value={excellentRating ? excellentRating : 0}
                  />
                </div>

                <p className="text-[14px] font-bold text-black">
                  {excellentRating.toFixed(0) ? excellentRating.toFixed(0) : 0}
                </p>
              </div>
              <div className="flex items-center mt-2 gap-4">
                <Rating
                  name="read-only"
                  mt-3
                  defaultValue={4}
                  readOnly
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
                <div className="lg:w-[270px] w-[130px] md:w-[130px] sm:w-[130px]">
                  <LinearProgress
                    color="warning"
                    determinate
                    value={topVgRating ? topVgRating : 0}
                  />
                </div>

                <p className="text-[14px] font-bold text-black">
                  {topVgRating.toFixed(0) ? topVgRating.toFixed(0) : 0}
                </p>
              </div>
              <div className="flex items-center mt-2 gap-4">
                <Rating
                  name="read-only"
                  mt-3
                  defaultValue={3}
                  readOnly
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
                <div className="lg:w-[270px] w-[130px] md:w-[130px] sm:w-[130px]">
                  <LinearProgress
                    color="warning"
                    determinate
                    value={goodRating ? goodRating : 0}
                  />
                </div>

                <p className="text-[14px] font-bold text-black">
                  {goodRating.toFixed(0) ? goodRating.toFixed(0) : 0}
                </p>
              </div>
              <div className="flex items-center mt-2 gap-4">
                <Rating
                  name="read-only"
                  mt-3
                  defaultValue={2}
                  readOnly
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
                <div className="lg:w-[270px] w-[130px] md:w-[130px] sm:w-[130px]">
                  <LinearProgress
                    color="warning"
                    determinate
                    value={Number.isNaN(averageRating) ? 0 : averageRating}
                  />
                </div>

                <p className="text-[14px] font-bold text-black">
                  {Number.isNaN(averageRating.toFixed(0))
                    ? 0
                    : averageRating.toFixed(0)}
                </p>
              </div>
              <div className="flex items-center mt-2 gap-4">
                <Rating
                  name="read-only"
                  mt-3
                  defaultValue={1}
                  readOnly
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
                <div className="lg:w-[270px] w-[130px] md:w-[130px] sm:w-[130px]">
                  <LinearProgress
                    color="warning"
                    determinate
                    value={poorRating ? poorRating : 0}
                  />
                </div>

                <p className="text-[14px] font-bold text-black">
                  {poorRating.toFixed(0) ? poorRating.toFixed(0) : 0}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between items-center py-4 px-6 border-b-[1px] border-[#0000001A]">
          <div className="flex justify-between items-center w-[120px]  bg-[#D9D9D926] px-4 py-2">
            <p className="text-[#74767E] text-[16px] font-medium">Filtter</p>
            <FaAngleDown className="text-[#74767E]" />
          </div>
          <div className="flex justify-between items-center w-[120px]  bg-[#D9D9D926] px-4 py-2">
            <p className="text-[#74767E] text-[16px] font-medium">Relevence</p>
            <FaAngleDown className="text-[#74767E]" />
          </div>
        </div> */}
          {singleProduct?.reviews?.map((item) => (
            <ReviewCard key={item.id} {...item} />
          ))}
        </div>
        <p className="text-[14px] mt-6 text-[#000000] font-bold">
          More from frequently Our Store
        </p>
        <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap justify-between items-start gap-2 mt-5 ">
          {storeProductsDetails.slice(0, 5).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </>
  );
}
