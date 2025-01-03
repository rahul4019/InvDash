"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp, Triangle } from "lucide-react";
import { useGetDashboardMetricsQuery } from "@/lib/store/services/api";
import numeral from "numeral";

export function PurchaseSummaryCard() {
  const { data: response, isLoading } = useGetDashboardMetricsQuery();
  const purchaseSummary = response?.data?.purchaseSummary || [];

  const lastDataPoint = purchaseSummary[purchaseSummary.length - 1] || null;
  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="flex-none">
        <CardTitle>Purchase Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "0"}
                </p>
                <div className="flex items-center text-sm">
                  {lastDataPoint.changePercentage! >= 0 ? (
                    <>
                      <TrendingUp
                        size={12}
                        className="text-green-500 mr-1 font-semibold"
                      />
                      <span className="text-green-500 mr-1 font-semibold">
                        {Math.abs(lastDataPoint.changePercentage!)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown
                        size={12}
                        className="text-red-500 mr-1 font-semibold"
                      />
                      <span className="font-semibold text-red-500">
                        {Math.abs(lastDataPoint.changePercentage!)}%
                      </span>
                    </>
                  )}
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
              className="h-[230px] -mt-10"
            >
              <ResponsiveContainer width="100%" className="p-2">
                <AreaChart
                  data={purchaseSummary}
                  margin={{ top: 0, right: 0, left: -80, bottom: 60 }}
                >
                  <XAxis
                    dataKey="date"
                    fontSize={0}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={0}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en")}`,
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                    content={<ChartTooltipContent />}
                  />
                  <Area
                    type="linear"
                    dataKey="totalPurchased"
                    stroke="var(--color-amount)"
                    fill="var(--color-amount)"
                    dot={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}
