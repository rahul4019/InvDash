"use client";

import Header from "@/components/Header";
import { useGetUsersQuery } from "@/lib/store/services/api";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Users() {
  const { data: response, isError, isLoading } = useGetUsersQuery();
  const users = response?.data;

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="py-4 text-red-500 text-center">Failed to fetch Users</div>
    );
  }
  return (
    <div className="p-4">
      <Header name="Users" />
      <DataTable columns={columns} data={users} />
    </div>
  );
}
