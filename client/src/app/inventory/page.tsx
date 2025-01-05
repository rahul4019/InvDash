"use client";

import Header from "@/components/Header";
import { useGetProductsQuery } from "@/lib/store/services/api";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Inventory() {
  const { data: response, isError, isLoading } = useGetProductsQuery();
  const products = response?.data;

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
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
      <Header name="Inventory" />
      <DataTable columns={columns} data={products} />
    </div>
  );
}
