"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useGetDashboardMetricsQuery } from "@/lib/store/services/api";

export function SalesSummaryCard() {
  const { data: response, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = response?.data?.saleSummary || [];

  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const totalSalesValue =
    salesData.reduce((acc, curr) => acc + Number(curr.totalValue), 0) || 0;

  const averageChangeInPercentage =
    salesData.reduce((acc, curr, _, arr) => {
      return acc + curr.changePercentage / arr.length;
    }, 0) || 0;

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Sales Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          {isLoading ? (
            <div className="font-semibold">Loading...</div>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  $
                  {(totalSalesValue / 1000000).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                  m
                </p>

                <div className="flex items-center text-sm">
                  {averageChangeInPercentage >= 0 ? (
                    <ArrowUpIcon className="w-4 h-4 mr-1 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 mr-1 text-red-500" />
                  )}
                  <span
                    className={
                      averageChangeInPercentage >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {Math.abs(averageChangeInPercentage).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground ml-1"></span>
                </div>
              </div>
              <Select
                defaultValue={period}
                onValueChange={(value) =>
                  setPeriod(value as "weekly" | "monthly")
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <ChartContainer
                config={{
                  amount: {
                    label: "Amount",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
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
                    <Bar
                      dataKey="amount"
                      fill="var(--color-amount)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </>
          )}
        </div>
      </CardContent>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            {/* <div> */}
            {/*   Highest: ${highestSales.amount.toLocaleString()} on{" "} */}
            {/*   {highestSales.date} */}
            {/* </div> */}
            {/* <div> */}
            {/*   Period: {salesData.length}{" "} */}
            {/*   {period === "weekly" ? "days" : "weeks"} */}
            {/* </div> */}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
