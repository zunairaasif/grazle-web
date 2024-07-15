"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logoo from "@/assets/Grazle Logo.png";
import Widget from "@/assets/Widget.png";
import Rasm1 from "@/assets/rasm33.png";
import Rasm2 from "@/assets/rasm2.png";
import Rasm3 from "@/assets/rasm3.png";
import Rasmaa from "@/assets/rasmcc.png";
import Rasmbb from "@/assets/rasmbb.png";
import Rasmcc from "@/assets/rasmaa.png";
import Dami from "@/assets/dami.png";

import MainSlider from "@/components/mianSlider";
import bg from "@/assets/2 copy.png";
import Google from "@/assets/Google Play Badge.png";
import Apple from "@/assets/Group.png";
import Arrow from "@/assets/Round Alt Arrow Right.png";
import Phone1 from "@/assets/Phone Mockup 1.png";
import Phone2 from "@/assets/Phone Mockup 2.png";
import Fram11 from "@/assets/Frame 11.png";
import Fram22 from "@/assets/Frame 22.png";
import Fram33 from "@/assets/Frame33.png";
import Fram44 from "@/assets/Frame 44.png";
import Cardmm from "@/assets/Cardmmm.png";

import RecentViewSlider from "@/components/rencentView";

import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import {
  getAllCategoriesApi,
  guestSuggestedProductsApi,
  trendingProductsApi,
  guestRecentProductsApi,
  favoriteProductApi,
  getRecentProductsApi,
  getSuggestedProductsApi,
  getFirstTrendingCategoryApi,
  getSecondTrendingCategoryApi,
  getBannersApi,
  getDynamicViewApi,
  getSeasonTop,
} from "@/apis";
import ProductCard from "@/components/ProductCard";
export default function Home() {
  const [allCategories, setCategories] = useState(undefined);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [firstTrendingCategory, setFirstTrendingCategory] = useState();
  const [secondTrendingCategory, setSecondTrendingCategory] = useState();
  const [positionOneBanners, setPositionOneBanners] = useState([]);
  const [positionTwoBanners, setPositionTwoBanners] = useState([]);
  const [positionThreeBanners, setPositionThreeBanners] = useState([]);
  const [dynamicViewProducts, setDynamicViewProducts] = useState([]);
  const [seasonTop, setSeasonTop] = useState([]);

  const router = useRouter();
  const sliderRef1 = useRef<any>(null);
  const sliderRef2 = useRef<any>(null);
  const sliderRef3 = useRef<any>(null);
  const sliderRef4 = useRef<any>(null);
  const sliderRef5 = useRef<any>(null);
  const sliderRef6 = useRef<any>(null);

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")!;
  }

  useEffect(() => {
    (async () => {
      const res = await getSuggestedProductsApi();
      const trendingRes = await trendingProductsApi();
      const recentRes = await guestRecentProductsApi();
      setSuggestedProducts(res?.data?.products || []);
      setTrendingProducts(trendingRes?.data?.products || []);
    })();
  }, []);

  // recentProducts
  useEffect(() => {
    (async () => {
      const recentProd = await getRecentProductsApi();

      setRecentProducts(recentProd?.data?.products || []);
    })();
  }, []);

  // dynamic view products
  useEffect(() => {
    (async () => {
      const { data } = await getDynamicViewApi();
      setDynamicViewProducts(data.products);
    })();
  }, []);

  // season top
  useEffect(() => {
    (async () => {
      const { data } = await getSeasonTop();
      setSeasonTop(data.products);
    })();
  }, []);

  // alll categories
  useEffect(() => {
    (async () => {
      const { data } = await getAllCategoriesApi();
      setCategories(data?.categories || []);
    })();
  }, []);

  // first trending category
  useEffect(() => {
    (async () => {
      const firstTrendingCategoryRes = await getFirstTrendingCategoryApi();
      setFirstTrendingCategory(firstTrendingCategoryRes);
    })();
  }, []);

  // second trending ctegory
  useEffect(() => {
    (async () => {
      const secondTrendingCategoryRes = await getSecondTrendingCategoryApi();
      setSecondTrendingCategory(secondTrendingCategoryRes);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const positionOneBanners = await getBannersApi(1);
      setPositionOneBanners(positionOneBanners.data.banners);
      const positionTwoBanners = await getBannersApi(2);
      setPositionTwoBanners(positionTwoBanners.data.banners);
      const positionThreeBanners = await getBannersApi(3);
      setPositionThreeBanners(positionThreeBanners.data.banners);
    })();
  }, []);

  const goToCreditLimit = () => {
    router.push("/CreditLimit");
  };

  const handlePrev = (num: any) => {
    if (num == 1) {
      sliderRef1?.current?.previous();
    }
    if (num == 2) {
      sliderRef2?.current?.previous();
    }
    if (num == 3) {
      sliderRef3?.current?.previous();
    }

    if (num == 4) {
      sliderRef4?.current?.previous();
    }

    if (num == 5) {
      sliderRef5?.current?.previous();
    }
    if (num == 6) {
      sliderRef6?.current?.previous();
    }
  };

  const handleNext = (num: any) => {
    if (num == 1) {
      sliderRef1?.current?.next();
    }
    if (num == 2) {
      sliderRef2?.current?.next();
    }
    if (num == 3) {
      sliderRef3?.current?.next();
    }
    if (num == 4) {
      sliderRef4?.current?.next();
    }
    if (num == 5) {
      sliderRef5?.current?.next();
    }
    if (num == 6) {
      sliderRef6?.current?.next();
    }
  };

  const fn_categoryClicked = (item: any) => {
    router.push(`/search?category=${item?.id}`);
  };

  return (
    <>
      <div className="lg:my-[20px] my-[10px] lg:px-0 sm:px-3 px-3 md:px-3 sm:my-[10px] md:my-[20px] lg:mx-[150px] mx-[0px] sm:mx-[20px] md:mx-[30px]">
        <div className="flex  items-center justify-between py-5 px-5  bg-gradient-to-r from-[#F81F1F] to-[#FFA31A] w-full lg:w-[100%] h-auto rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="rounded-full lg:h-[60px] lg:w-[60px] h-[40px] w-[40px] sm:w-[40px] sm:h-[40px] bg-[#FA6464] flex items-center justify-center">
              <Image
                width={40}
                height={40}
                alt=""
                src={Cardmm}
                className="lg:h-[40px] lg:w-[40px] w-[30px] h-[30px] sm:w-[30px] sm:h-[30px] "
              />
            </div>
            <div>
              <p className="text-white text-[10px] lg:text-2xl font-semibold">
                Credit Limit
              </p>
              <p className="text-white text-[8px] lg:text-lg font-normal">
                Get Credit Up to 10 Lacs
              </p>
            </div>
          </div>
          <button
            className="text-[#F70000] text-[10px] lg:text-xl font-semibold bg-white border-[1px] border-[#F70000] rounded-full lg:h-[45px] h-[35px] lg:w-[210px] sm:h-[40px] lg:h-[50px] px-10 lg:px-10"
            onClick={goToCreditLimit}
          >
            Get Now
          </button>
        </div>
      </div>
      {/* MianSlider */}
      <div className="lg:mx-[150px] md:mx-[60px] lg:px-0 sm:px-3 px-3 md:px-3">
        <MainSlider banners={positionOneBanners} />
      </div>

      <div className="hide-scrollbar lg:mx-[150px] gap-2 sm:gap-2 lg:gap-0 mt-3 lg:mt-2 md:mx-auto overflow:-webkit-scrollbar: none; md:overflow-x-auto md:w-[645px] lg:w-auto sm:mx-auto sm:max-w-[calc(100vw - 120px)] flex items-center justify-between overflow-x-auto">
        {/* <div className="w-[92px] sm:mt-2   md:gap-2 flex flex-col justify-center items-center">
          <div className=" flex  justify-center items-center lg:w-[92px] lg:h-[92px] w-[70px] h-[70px] sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-r from-[#F81F1F] to-[#FFA31A] ">
            <Image
              src={Cardmm}
              alt=""
              className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] sm:h-[30px] sm:w-[30px] "
            />
          </div>
          <p className="color-[#393A44] lg:text-[14px] text-[10px] sm:text-[12px] font-normal mt-[4px]">
            Categories
          </p>
        </div> */}
        {/* !!categories */}
        <div className="w-full flex flex-col justify-center items-center mx-2 text-center">
          <div className="border-[1px] flex justify-center items-center lg:w-[92px] lg:h-[92px] w-[70px] h-[70px] sm:w-[70px] sm:h-[70px]  border-[#F70000] rounded-full bg-[#F8F8F8] ">
            <Image
              width={40}
              height={40}
              src={Widget}
              alt=""
              className=" lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] sm:h-[30px] sm:w-[30px] "
            />
          </div>

          <p className="text-nowrap color-[#393A44] lg:text-[14px] text-[10px] sm:text-[12px] font-normal mt-[4px]">
            Categories
          </p>

          {!allCategories?.length && (
            <h1 className="my-2 text-center text-red-500">
              Loading categories.....
            </h1>
          )}
        </div>

        {allCategories?.map((item) => (
          <>
            <div
              key={item?.id}
              className="w-full flex flex-col justify-center items-center mx-2 text-center"
              onClick={() => fn_categoryClicked(item)}
            >
              <div className="border-[1px] flex justify-center items-center lg:w-[92px] lg:h-[92px] w-[70px] h-[70px] sm:w-[70px] sm:h-[70px]  border-[#F70000] rounded-full bg-[#F8F8F8] ">
                {item?.image !== null ? (
                  <Image
                    width={40}
                    height={40}
                    src={item?.image}
                    alt=""
                    className=" lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] sm:h-[30px] sm:w-[30px] "
                  />
                ) : (
                  <Image
                    width={40}
                    height={40}
                    src={Widget}
                    alt=""
                    className=" lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] sm:h-[30px] sm:w-[30px] "
                  />
                )}
              </div>
              <p className="text-nowrap color-[#393A44] lg:text-[14px] text-[10px] sm:text-[12px] font-normal mt-[4px]">
                {item?.name}
              </p>
            </div>
          </>
        ))}
      </div>

      {/* !!Recent Products */}
      <div className="lg:mx-[150px] md:mx-[60px]  my-[24px]">
        <div className="flex items-center justify-between lg:px-0 px-2">
          <p className="text-[24px] font-semibold">Recent Viewed</p>
          {recentProducts?.length ? (
            <div className="flex items-center gap-4">
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handlePrev(2)}
              >
                <IoMdArrowBack className="text-black h-[24px] w-[24px]" />
              </div>
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handleNext(2)}
              >
                <IoMdArrowForward className="text-black h-[24px] w-[24px]" />
              </div>
            </div>
          ) : null}
        </div>
        {recentProducts?.length ? (
          <div className="mx-[20px] sm:mx-[20px] md:mx-[20px] lg:mx-[0px]">
            <RecentViewSlider Data={recentProducts} ref={sliderRef1} />
          </div>
        ) : typeof recentProducts === "undefined" ? (
          <h1 className="text-center text-red-500">Loading products.....</h1>
        ) : (
          <h1 className="text-center text-red-500">No recent product found</h1>
        )}
      </div>

      {/* trending category 1 */}
      <div className="lg:mx-[150px] md:mx-[60px]  my-[24px]">
        <div className="flex items-center justify-between lg:px-0 px-2">
          <p className="text-[24px] font-semibold">
            {firstTrendingCategory?.data.category?.name}
          </p>
          {firstTrendingCategory?.data.products?.length ? (
            <div className="flex items-center gap-4">
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handlePrev(4)}
              >
                <IoMdArrowBack className="text-black h-[24px] w-[24px]" />
              </div>
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handleNext(4)}
              >
                <IoMdArrowForward className="text-black h-[24px] w-[24px]" />
              </div>
            </div>
          ) : null}
        </div>
        {firstTrendingCategory?.data.products?.length ? (
          <div className="mx-[20px] sm:mx-[20px] md:mx-[20px] lg:mx-[0px]">
            <RecentViewSlider
              Data={firstTrendingCategory?.data?.products}
              ref={sliderRef4}
            />
          </div>
        ) : typeof firstTrendingCategory === "undefined" ? (
          <h1 className="text-center text-red-500">Loading products.....</h1>
        ) : (
          <h1 className="text-center text-red-500">
            No {firstTrendingCategory?.data.category?.name} found
          </h1>
        )}
      </div>

      {/* trending category 2 */}
      <div className="lg:mx-[150px] md:mx-[60px]  my-[24px]">
        <div className="flex items-center justify-between lg:px-0 px-2">
          <p className="text-[24px] font-semibold">
            {secondTrendingCategory?.data.category?.name}
          </p>
          {secondTrendingCategory?.data.products?.length ? (
            <div className="flex items-center gap-4">
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handlePrev(5)}
              >
                <IoMdArrowBack className="text-black h-[24px] w-[24px]" />
              </div>
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handleNext(5)}
              >
                <IoMdArrowForward className="text-black h-[24px] w-[24px]" />
              </div>
            </div>
          ) : null}
        </div>
        {secondTrendingCategory?.data.products?.length ? (
          <div className="mx-[20px] sm:mx-[20px] md:mx-[20px] lg:mx-[0px]">
            <RecentViewSlider
              Data={secondTrendingCategory?.data?.products}
              ref={sliderRef4}
            />
          </div>
        ) : typeof secondTrendingCategory === "undefined" ? (
          <h1 className="text-center text-red-500">Loading products.....</h1>
        ) : (
          <h1 className="text-center text-red-500">
            No {secondTrendingCategory?.data.category?.name} found
          </h1>
        )}
      </div>

      {/* !!Baner */}
      <div className="lg:mx-[150px] md:mx-[60px] m-[20px]  my-[16px]">
        <Image
          width={100}
          height={100}
          src={
            positionTwoBanners[0]?.imageUrl
              ? positionTwoBanners[0]?.imageUrl
              : bg
          }
          alt=""
          className="w-[100%] md:h-[300px] sm:h-[200px] h-[220px] lg:rounded-none rounded-lg sm:rounded-lg lg:h-[417px]"
        />
      </div>

      {/* !!dynamic view */}
      <div className="lg:mx-[150px] md:mx-[60px]  my-[24px]">
        <div className="flex items-center justify-between lg:px-0 px-2">
          <p className="text-[24px] font-semibold">Dynamic View</p>
          {dynamicViewProducts?.length ? (
            <div className="flex items-center gap-4">
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handlePrev(6)}
              >
                <IoMdArrowBack className="text-black h-[24px] w-[24px]" />
              </div>
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handleNext(6)}
              >
                <IoMdArrowForward className="text-black h-[24px] w-[24px]" />
              </div>
            </div>
          ) : null}
        </div>
        {dynamicViewProducts?.length ? (
          <div className="mx-[20px] sm:mx-[20px] md:mx-[20px] lg:mx-[0px]">
            <RecentViewSlider Data={dynamicViewProducts} ref={sliderRef6} />
          </div>
        ) : typeof dynamicViewProducts === "undefined" ? (
          <h1 className="text-center text-red-500">Loading products.....</h1>
        ) : (
          <h1 className="text-center text-red-500">
            No dynamic view product found
          </h1>
        )}
      </div>

      {/* !!Suggested for you */}

      {token !== null && (
        <div className="lg:mx-[150px] md:mx-[60px]  my-[24px]">
          <div className="flex items-center justify-between lg:px-0 px-2">
            <p className="text-[24px] font-semibold">Suggested for you</p>
            {suggestedProducts?.length > 0 ? (
              <div className="flex items-center gap-4">
                <div
                  className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                  onClick={() => handlePrev(2)}
                >
                  <IoMdArrowBack className="text-black h-[24px] w-[24px]" />
                </div>
                <div
                  className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                  onClick={() => handleNext(2)}
                >
                  <IoMdArrowForward className="text-black h-[24px] w-[24px]" />
                </div>
              </div>
            ) : null}
          </div>
          {suggestedProducts?.length ? (
            <div className="mx-[20px] sm:mx-[20px] md:mx-[20px] lg:mx-[0px]">
              <RecentViewSlider Data={suggestedProducts} ref={sliderRef2} />
            </div>
          ) : typeof suggestedProducts === "undefined" ? (
            <h1 className="text-center text-red-500">Loading products.....</h1>
          ) : (
            <h1 className="text-center text-red-500">
              No suggested product found
            </h1>
          )}
        </div>
      )}

      {/* season top product */}
      <div
        className="lg:mx-[150px] md:mx-[60px]  my-[24px] p-10"
        style={{
          background:
            "linear-gradient(97.69deg, rgba(247, 0, 0, 0.1) 3.55%, rgba(145, 131, 0, 0.1) 91.28%)",
        }}
      >
        <div className="flex items-center justify-between lg:px-0 px-2">
          <p className="text-[24px] font-semibold">Season Top Pick</p>
        </div>

        <div className=" flex flex-col md:flex-row gap-10 ">
          <div className="product w-full md:w-[40%]">
            <ProductCard width="70" product={seasonTop[0]} />
          </div>
          <div className="w-full md:w-[60%] relative">
            <Image
              className="!relative w-full"
              alt="banners"
              fill
              src={
                positionTwoBanners[0]?.imageUrl
                  ? positionTwoBanners[0]?.imageUrl
                  : bg
              }
            />
          </div>
        </div>
      </div>

      {/* !!Trending Products */}
      <div className="lg:mx-[150px] md:mx-[60px]  my-[24px]">
        <div className="flex items-center justify-between lg:px-0 px-2">
          <p className="text-[24px] font-semibold">Trending Products</p>
          {trendingProducts?.length ? (
            <div className="flex items-center gap-4">
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handlePrev(3)}
              >
                <IoMdArrowBack className="text-black h-[24px] w-[24px]" />
              </div>
              <div
                className="h-[46px] w-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center  "
                onClick={() => handleNext(3)}
              >
                <IoMdArrowForward className="text-black h-[24px] w-[24px]" />
              </div>
            </div>
          ) : null}
        </div>
        {trendingProducts?.length ? (
          <div className="mx-[20px] sm:mx-[20px] md:mx-[20px] lg:mx-[0px]">
            <RecentViewSlider Data={trendingProducts} ref={sliderRef3} />
          </div>
        ) : typeof suggestedProducts === "undefined" ? (
          <h1 className="text-center text-red-500">Loading products.....</h1>
        ) : (
          <h1 className="text-center text-red-500">
            No trending product found
          </h1>
        )}
      </div>

      {/* small appliances */}
      <div
        style={{
          background:
            "linear-gradient(97.69deg, rgba(247, 0, 0, 0.1) 3.55%, rgba(145, 131, 0, 0.1) 91.28%)",
        }}
        className="lg:mx-[150px] md:mx-[60px] mx-[20px] relative lg:h-[491px] md:h-[400px] sm:h-auto lg:px-[100px] px-[20px] sm:px-[40px] md:px-[40px] py-[0px] my-[16px] flex lg:flex-row justify-between"
      >
        <div className="flex flex-col items-start lg:w-auto md:w-auto w-[45%] lg:mt-7 mt-3">
          <Image
            src={Logoo}
            alt=""
            className="lg:w-[120px] lg:h-[70px] md:w-[100px] md:h-[60px] w-[80px] h-[50px]"
          />
          <div className="lg:w-[570px] md:w-[400px] w-[180px] mt-[32px]">
            <p className="lg:text-[48px] md:text-[36px] text-[14px] font-bold">
              Simplify your shopping with GRAZLE
            </p>
            <p className="lg:text-[16px] md:text-[14px] text-[10px]">
              SHOPPING ON THE GO IS FAST AND EASY
            </p>
            <p className="lg:text-[16px] md:text-[14px] text-[10px] mt-[8px] text-[#393A44] font-medium">
              Get the App
            </p>
            <div className="flex items-center lg:mt-[32px] mt-[8px] sm:mt-[8px]  md:mt-[8px]   mb-4">
              <Image
                src={Google}
                alt=""
                className="lg:w-[135px] lg:h-[40px] md:w-[120px] md:h-[35px] w-[80px] h-[25px] mr-[16px]"
              />
              <Image
                src={Apple}
                alt=""
                className="lg:w-[135px] lg:h-[40px] md:w-[120px] md:h-[35px] w-[80px] h-[25px]"
              />
            </div>
          </div>
        </div>
        <div className="flex lg:ml-[32px] md:ml-[24px] ml-[16px] lg:mt-0 mt-[0px] lg:flex-row flex-col items-center lg:w-auto md:w-auto w-full">
          <Image
            src={Phone1}
            alt=""
            className="lg:w-[278px] lg:h-[356px] md:w-[170px] md:h-[250px] w-[100px] h-[130px] lg:relative lg:right-[34px] lg:top-[-66px] lg:ml-[16px] md:absolute md:right-[185px] md:top-[0px] relative"
          />
          <Image
            src={Phone2}
            alt=""
            className="lg:w-[278px] lg:h-[356px] md:w-[170px] md:h-[250px] w-[100px] h-[130px] lg:relative lg:right-[40px] top-[-10px]  right-[-55px] lg:bottom-[-66px] lg:mt-0 mt-[16px] md:absolute md:right-[40px] md:bottom-[0px] relative"
          />
        </div>
      </div>
    </>
  );
}
