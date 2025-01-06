"use client";

import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { useGetProductsQuery } from "@/lib/store/services/api";
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
    <div className="p-4">
      <SearchInput />
      <Header name="Products" />
    </div>
  );
}
