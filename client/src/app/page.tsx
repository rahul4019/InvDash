"use client";

import CommonDashboardCard from "@/components/CommonDashboardCard";
import ExpenseSummaryCard from "@/components/ExpenseSummaryCard";
import { PopularProductsCard } from "@/components/PopularProductsCard";
import { PurchaseSummaryCard } from "@/components/PurchaseSummaryCard";
import { SalesSummaryCard } from "@/components/SalesSummaryCard";

export default function Home() {
  return (
    <div className="p-4 grid grid-rows-1 grid-cols-1 lg:grid-rows-8 lg:grid-cols-3  gap-4">
      <div className="h-[60vh] row-span-6">
        <PopularProductsCard />
      </div>
      <div className="h-[60vh] row-span-6">
        <SalesSummaryCard />
      </div>
      <div className="h-[30vh] row-span-3">
        <PurchaseSummaryCard />
      </div>
      <div className="h-[30vh] row-span-3">
        <ExpenseSummaryCard />
      </div>
      {/* <div className="h-[30vh] bg-yellow-400"> */}
      {/*   <CommonDashboardCard /> */}
      {/* </div> */}
      {/* <div className=""> */}
      {/*   <CommonDashboardCard /> */}
      {/* </div> */}
      {/* <div className=""> */}
      {/*   <CommonDashboardCard /> */}
      {/* </div> */}
    </div>
  );
}
