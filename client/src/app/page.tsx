"use client";

import CommonStatCard from "@/components/CommonStatCard";
import ExpenseSummary from "@/components/ExpenseSummaryCard";
import { PopularProductsCard } from "@/components/PopularProductsCard";
import { PurchaseSummaryCard } from "@/components/PurchaseSummaryCard";
import { SalesSummaryCard } from "@/components/SalesSummaryCard";
import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div
      className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      style={{
        gridTemplateRows: "repeat(6, 9.09vh) ",
      }}
    >
      <div className="row-span-6">
        <PopularProductsCard />
      </div>
      <div className="row-span-6">
        <SalesSummaryCard />
      </div>
      <div className="row-span-3">
        <PurchaseSummaryCard />
      </div>
      <div className="row-span-3">
        <ExpenseSummary />
      </div>
      <div className="row-span-2">
        <CommonStatCard
          title="Customer & Expenses"
          icon={<Package className="text-primary" size={22} />}
          dateRange="22 - 29 Nov 2024"
          details={[
            {
              title: "Customer Growth",
              amount: "172.00",
              changePercentage: 131,
              iconComponent: TrendingUp,
            },
            {
              title: "Expenses",
              amount: "15.00",
              changePercentage: -42,
              iconComponent: TrendingDown,
            },
          ]}
        />
      </div>
      <div className="row-span-2">
        <CommonStatCard
          title="Dues & Pending Orders"
          icon={<CheckCircle className="text-primary" size={22} />}
          dateRange="22 - 29 Nov 2024"
          details={[
            {
              title: "Dues",
              amount: "161.00",
              changePercentage: 110,
              iconComponent: TrendingUp,
            },
            {
              title: "Pending Orders",
              amount: "147.00",
              changePercentage: -56,
              iconComponent: TrendingDown,
            },
          ]}
        />
      </div>
      <div className="row-span-2">
        <CommonStatCard
          title="Sales & Discount"
          icon={<Tag className="text-primary" size={22} />}
          dateRange="22 - 29 Nov 2024"
          details={[
            {
              title: "Sales",
              amount: "1000.00",
              changePercentage: 20,
              iconComponent: TrendingUp,
            },
            {
              title: "Discount",
              amount: "200.00",
              changePercentage: -10,
              iconComponent: TrendingDown,
            },
          ]}
        />
      </div>
    </div>
  );
}
