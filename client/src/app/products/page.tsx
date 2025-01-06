"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/lib/store/services/api";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Products() {
  const [searchTerm, setsearchTerm] = useState("");
  const { data: response, isLoading, isError } = useGetProductsQuery();
  const products = response?.data;

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="py-4 text-red-500 text-center">
        Failed to fetch products
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <SearchInput />
      <div className="flex w-full justify-between">
        <Header name="Products" />

        <Button variant="default" className="aspect-square max-sm:p-0">
          <Plus size={16} strokeWidth={3} aria-hidden="true" />
          <span className="max-sm:sr-only font-semibold">Create Product</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            stock={product.stockQuantity}
            rating={product.rating!}
          />
        ))}
      </div>
    </div>
  );
}
