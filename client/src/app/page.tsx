"use client";

import CommonDashboardCard from "@/components/CommonDashboardCard";
import ExpenseSummary from "@/components/ExpenseSummaryCard";
import { PopularProductsCard } from "@/components/PopularProductsCard";
import { PurchaseSummaryCard } from "@/components/PurchaseSummaryCard";
import { SalesSummaryCard } from "@/components/SalesSummaryCard";

export default function Home() {
  return (
    <div
      className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      style={{
        gridTemplateRows:
          "repeat(6, 9.09vh) repeat(3, 9.09vh) repeat(2, 9.09vh)",
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
        <CommonDashboardCard />
      </div>
      <div className="row-span-2">
        <CommonDashboardCard />
      </div>
      <div className="row-span-2">
        <CommonDashboardCard />
      </div>
    </div>
  );
}
