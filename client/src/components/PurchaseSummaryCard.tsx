"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Triangle } from "lucide-react";

interface PurchaseData {
  date: string;
  amount: number;
}

const purchaseData: PurchaseData[] = [
  { date: "Jan", amount: 1000 },
  { date: "Feb", amount: 1900 },
  { date: "Mar", amount: 1600 },
  { date: "Apr", amount: 1400 },
  { date: "May", amount: 1200 },
  { date: "Jun", amount: 1000 },
  { date: "Jul", amount: 2800 },
];

const getPurchaseSummary = (data: PurchaseData[]) => {
  const totalPurchases = data.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );
  const firstMonth = data[0].amount;
  const lastMonth = data[data.length - 1].amount;
  const percentageDecline = ((firstMonth - lastMonth) / firstMonth) * 100;
  return { totalPurchases, percentageDecline };
};

export function PurchaseSummaryCard() {
  const { totalPurchases, percentageDecline } = useMemo(
    () => getPurchaseSummary(purchaseData),
    [],
  );

  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="flex-none">
        <CardTitle>Purchase Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-1">
            <p className="text-2xl font-bold">
              ${totalPurchases.toLocaleString()}
            </p>
            <div className="flex items-center text-sm">
              <Triangle size={12} className="text-green-500 mr-1 font-bold" />
              <span className="text-green-500 font-bold">
                {percentageDecline.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            amount: {
              label: "Amount",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[100px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={purchaseData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="var(--color-amount)"
                fill="var(--color-amount)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
