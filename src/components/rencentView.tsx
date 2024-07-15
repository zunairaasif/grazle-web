"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import { FaHeart } from "react-icons/fa";

import Star from "@/assets/Star 1.png";
import Cart from "@/assets/CartVector.png";
import Like from "@/assets/Frame 1820551183.png";
import { useRouter } from "next/navigation";
import Phone1 from "@/assets/Phone Mockup 1.png";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "@/features/features";
import {
  addRecenetViewedApi,
  favoriteProductApi,
  getAllFavoriteProductApi,
} from "@/apis";
import Link from "next/link";
import { Rating } from "@mui/material";
interface Props {
  Data: any;
}

const responsive = {
  lgdesktop: {
    breakpoint: { max: 3000, min: 1441 },
    items: 4,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1041 },
    items: 4,
    slidesToSlide: 1,
  },
  Laptop: {
    breakpoint: { max: 1040, min: 769 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 320 },
    items: 1,
    slidesToSlide: 1,
  },
};

const RecentViewSlider = React.forwardRef((props: Partial<Props>, ref: any) => {
  const { Data } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const [isPending, setPending] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getAllFavoriteProductApi();
      const productIds =
        (data?.products?.length && data?.products?.map((item) => item.id)) ||
        [];
      setFavoriteProducts(productIds);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selectedId) return;
      const { data } = await addRecenetViewedApi(selectedId);
    })();
  }, [selectedId]);

  const goToDetail = async (id) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      const ids = localStorage.getItem("productIds")
        ? JSON.parse(localStorage.getItem("productIds")!)
        : [];

      if (!ids.includes(id)) {
        ids.push(id);
        localStorage.setItem("productIds", JSON.stringify(ids));
      }
    }
    router.push("/detailProduct/" + id);
  };
  const onAddingCart = (e, product) => {
    e.stopPropagation();
    const updateProduct = { ...product, qty: 1 };
    dispatch(updateCart({ type: null, product: updateProduct }));
  };
  async function onLiked(e, productId) {
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

  return (
    <div className="parent">
      <Carousel
        ref={ref}
        arrows={false}
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item"
      >
        {Data.map((item: any, index: any) => (
          <div
            onClick={() => goToDetail(item.id)}
            key={index}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 4px",
            }}
            className="group lg:w-[98%] sm:w-[100%] w-[100%]  mb-3 mt-2 h-[398px] mt-[24px] rounded-2xl hover:border-[1px] border-[#F70001] hover:h-[450px] relative"
          >
            <Link href={`/detailProduct/${item.id}`}>
              {/* TODO:add image later item.featured_image */}
              <Image
                alt=""
                width={203}
                height={203}
                src={"/" + item.featured_image}
                className="w-full h-[203px] relative rounded-2xl cursor-pointer"
              />
              <div className="flex w-full justify-between items-center absolute px-[16px] top-[10px]">
                <button
                  style={{ backgroundColor: "rgba(247, 0, 0, 0.1)" }}
                  className="text-[12px] font-semibold border-[1px] rounded-3xl bg-red-500 border-[#F70000] text-[#F70000] w-[96px] h-[34px]"
                >
                  flash sales
                </button>
                <IconButton size="medium" onClick={(e) => onLiked(e, item.id)}>
                  {favoriteProducts?.includes(item.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaHeart className="text-zinc-500" />
                  )}
                </IconButton>
              </div>
              <div className="p-3">
                <p className="text-[16px] w-[80%] font-semibold">
                  {item?.title}
                </p>
                <div className="flex items-center mt-[16px]">
                  <p className="text-[12px] text-[#F69B26]">{item.review}</p>
                  <Rating
                    precision={0.5}
                    name="read-only"
                    readOnly
                    mt-3
                    defaultValue={Number(item?.rating)}
                  />
                </div>
                <p className="text-[20px] font-semibold mt-[16px]">
                  ₹{item?.discount ? item.discounted_price : item.price}
                </p>
                <div className="flex items-center mt-[16px]">
                  <p className="text-[16px] text-[#909198] line-through font-normal">
                    ₹{item.discount ? item.price : 0}
                  </p>
                  <p className="text-[16px] text-[#4FAD2E] ml-[24px] font-semibold">
                    {item.discount ? item.discount : "0%"}
                  </p>
                </div>
              </div>
              <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 w-full">
                <button
                  className="text-[#F70000] w-[90%] h-[40px] border-[1px] border-[#F70001] rounded-full"
                  onClick={(e) => onAddingCart(e, item)}
                >
                  <div className="flex items-center justify-center">
                    <p className="font-semibold text-[14px]">Add to cart</p>
                    <Image
                      alt=""
                      src={Cart}
                      className="w-[17px] h-[17px] ml-[12px]"
                    />
                  </div>
                </button>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
});

export default RecentViewSlider;
