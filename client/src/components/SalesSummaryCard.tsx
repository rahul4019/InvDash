"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
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
import { TrendingUp, TrendingDown } from "lucide-react";
import { useGetDashboardMetricsQuery } from "@/lib/store/services/api";
import { SalesSummaryCardSkeleton } from "./SalesSummaryCardSkeleton";

export function SalesSummaryCard() {
  const { data: response, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = response?.data?.salesSummary || [];

  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );

  const totalSalesValue =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangeInPercentage =
    salesData.reduce((acc, curr, _, arr) => {
      return acc + curr.changePercentage / arr.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0]);

  const highestValueDate = highestValueData?.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Sales Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {isLoading ? (
            <SalesSummaryCardSkeleton />
          ) : (
            <>
              <div className="flex-col flex w-full">
                <div className="flex  justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      value
                    </span>
                    <div className="flex gap-2">
                      <p className="text-2xl font-bold">
                        $
                        {(totalSalesValue / 1000000).toLocaleString("en", {
                          maximumFractionDigits: 2,
                        })}
                        m
                      </p>
                      <div className="flex items-center text-sm">
                        {averageChangeInPercentage >= 0 ? (
                          <>
                            <TrendingUp
                              size={12}
                              className="text-green-500 mr-1 font-semibold"
                            />
                            <span className="text-green-500 mr-1 font-semibold">
                              {Math.abs(averageChangeInPercentage).toFixed(1)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown
                              size={12}
                              className="text-red-500 mr-1 font-semibold"
                            />
                            <span className="font-semibold text-red-500">
                              {Math.abs(averageChangeInPercentage).toFixed(1)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Select
                    defaultValue={period}
                    onValueChange={(value) =>
                      setPeriod(value as "daily" | "weekly" | "monthly")
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[250px] mt-10"
                >
                  <ResponsiveContainer width="100%">
                    <BarChart
                      data={salesData}
                      margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis
                        fontSize={12}
                        dx={-1}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                          return `$${(value / 1000000).toFixed(0)}m`;
                        }}
                      />
                      <CartesianGrid strokeDasharray="" vertical={false} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
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
                      />
                      <Bar
                        dataKey="totalValue"
                        fill="var(--color-amount)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </>
          )}
        </div>
      </CardContent>
      {!isLoading && (
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div>{salesData.length || 0} days</div>
          <div>
            Highest Sales Date:{" "}
            <span className="font-bold">{highestValueDate}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
