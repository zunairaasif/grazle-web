import { getOfferProductsApi } from "@/apis";
import ProductCard from "@/components/ProductCard";
import React from "react";

const page = async () => {
  const { data } = await getOfferProductsApi();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data.products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default page;
