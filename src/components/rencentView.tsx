"use client";
import {
  favoriteProductApi,
  addRecenetViewedApi,
  getAllFavoriteProductApi,
} from "@/apis";
import Link from "next/link";
import Image from "next/image";
import heart from "@/assets/like.png";
import { Rating } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Cart from "@/assets/CartVector.png";
import Carousel from "react-multi-carousel";
import { useRouter } from "next/navigation";
import "react-multi-carousel/lib/styles.css";
import { updateCart } from "@/features/features";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";

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
    items: 2,
    slidesToSlide: 1,
  },
};

const RecentViewSlider = React.forwardRef((props: Partial<Props>, ref: any) => {
  const { Data } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending, setPending] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllFavoriteProductApi();
      const productIds =
        (data?.products?.length &&
          data?.products?.map((item: any) => item.id)) ||
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

  const goToDetail = async (id: any) => {
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

  const onAddingCart = (e: any, product: any) => {
    e.stopPropagation();
    const updateProduct = { ...product, qty: 1 };
    dispatch(updateCart({ type: null, product: updateProduct }));
  };

  async function onLiked(e: any, productId: any) {
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
    <div className="parent md:h-[460px] h-[390px]">
      <Carousel
        ref={ref}
        arrows={false}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        responsive={responsive}
        itemClass="carousel-item"
        dotListClass="custom-dot-list-style"
      >
        {Data.map((item: any, index: any) => (
          <div
            onClick={() => goToDetail(item.id)}
            key={index}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 4px",
            }}
            className="group lg:w-[98%] w-[95%] border border-gray-200 mb-1 mt-2 mt-[24px] rounded-2xl hover:border-[1px] border-[#F70001] relative"
          >
            <Link href={`/detailProduct/${item.id}`}>
              {/* TODO:add image later item.featured_image */}
              <Image
                alt=""
                width={203}
                height={203}
                src={"/" + item.featured_image}
                className="w-full h-[203px] object-cover rounded-2xl cursor-pointer"
              />

              <div className="flex w-full justify-between items-center absolute px-[16px] top-[10px]">
                <button className="md:text-[12px] text-[9px] rounded-3xl text-white bg-[#F70000] md:py-2 py-1 md:px-3 px-2">
                  75% OFF
                </button>

                <IconButton size="medium" onClick={(e) => onLiked(e, item.id)}>
                  {favoriteProducts?.includes(item.id) ? (
                    <FaHeart className="text-[#F70000]" />
                  ) : (
                    <Image src={heart} alt="like" />
                  )}
                </IconButton>
              </div>

              <div className="p-3">
                <p className="text-[16px] w-[80%] font-semibold">
                  {item?.title}
                </p>
                <div className="flex items-center md:mt-[16px] mt-[8px] gap-1">
                  <span className="md:text-sm text-[9px] text-[#F69B26]">
                    4.8 (342)
                  </span>
                  <FaStar size={12} color="#F69B26" />

                  {/* <p className="text-[12px] text-[#F69B26]">{item.review}</p>
                  <Rating
                    precision={0.5}
                    name="read-only"
                    readOnly
                    mt-3
                    defaultValue={Number(item?.rating)}
                  /> */}
                </div>

                <p className="md:text-[20px] text-[14px] text-[#FC3030] font-semibold md:mt-[16px] mt-[8px]">
                  ₹{item?.discount ? item.discounted_price : item.price}
                </p>

                <div className="flex items-center md:mt-[16px] mt-[8px]">
                  <p className="md:text-[16px] text-[10px] text-[#909198] line-through font-normal">
                    ₹{item.discount ? item.price : 0}
                  </p>

                  <p className="md:text-[16px] text-[10px] text-[#4FAD2E] ml-[24px] font-semibold">
                    {item.discount ? item.discount : "0% Off"}
                  </p>
                </div>
              </div>

              <div className="hidden mb-3 flex justify-center opacity-0 group-hover:opacity-100 group-hover:flex w-full">
                <button
                  className="text-[#F70000] w-[90%] h-[40px] border-[1px] border-[#F70001] rounded-lg"
                  onClick={(e) => onAddingCart(e, item)}
                >
                  <div className="flex items-center justify-center">
                    <p className="font-semibold text-[14px]">Add to cart</p>
                    <Image
                      alt=""
                      src={Cart}
                      className="w-[20px] h-[20px] ml-[12px]"
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
