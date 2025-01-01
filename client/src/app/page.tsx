"use client";

import { PopularProductsCard } from "@/components/PopularProductsCard";
import { PurchaseSummaryCard } from "@/components/PurchaseSummaryCard";
import { SalesSummaryCard } from "@/components/SalesSummaryCard";

export default function Home() {
  return (
    <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-8 gap-4">
      <div className="p-4 row-span-6">
        <PopularProductsCard />
      </div>
      <div className="p-4 row-span-6">
        <SalesSummaryCard />
      </div>
      <div className="p-4 row-span-3">
        <PurchaseSummaryCard />
      </div>
      <div className="bg-red-500 p-4 row-span-3">4</div>
      <div className="bg-red-500 rows-2">5</div>
      <div className="bg-red-500 rows-2">6</div>
      <div className="bg-red-500 rows-2">7</div>
    </div>
  );
}
