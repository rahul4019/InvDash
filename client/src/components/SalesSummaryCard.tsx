"use client";

import { useState, useMemo } from "react";
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

// Define the structure for sales data
interface SalesData {
  date: string;
  amount: number;
}

// Sample data for different time periods
const weeklySales: SalesData[] = [
  { date: "Mon", amount: 1200 },
  { date: "Tue", amount: 1400 },
  { date: "Wed", amount: 1800 },
  { date: "Thu", amount: 1600 },
  { date: "Fri", amount: 2200 },
  { date: "Sat", amount: 2600 },
  { date: "Sun", amount: 2000 },
];

const monthlySales: SalesData[] = [
  { date: "Week 1", amount: 8000 },
  { date: "Week 2", amount: 9200 },
  { date: "Week 3", amount: 10500 },
  { date: "Week 4", amount: 11800 },
];

// Helper function to get the highest sales
const getHighestSales = (data: SalesData[]) => {
  return data.reduce((max, sale) => (sale.amount > max.amount ? sale : max));
};

// Helper function to calculate total sales and percentage increase
const getSalesSummary = (data: SalesData[]) => {
  const totalSales = data.reduce((sum, sale) => sum + sale.amount, 0);
  const previousPeriodSales = data === weeklySales ? 10800 : 36000; // Simulated previous period sales
  const percentageIncrease =
    ((totalSales - previousPeriodSales) / previousPeriodSales) * 100;
  return { totalSales, percentageIncrease };
};

export function SalesSummaryCard() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const salesData = period === "weekly" ? weeklySales : monthlySales;
  const highestSales = getHighestSales(salesData);
  const { totalSales, percentageIncrease } = useMemo(
    () => getSalesSummary(salesData),
    [salesData],
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sales Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
            <div className="flex items-center text-sm">
              {percentageIncrease >= 0 ? (
                <ArrowUpIcon className="w-4 h-4 mr-1 text-green-500" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 mr-1 text-red-500" />
              )}
              <span
                className={
                  percentageIncrease >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                {Math.abs(percentageIncrease).toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </div>
          <Select
            defaultValue={period}
            onValueChange={(value) => setPeriod(value as "weekly" | "monthly")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
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
          className="h-[200px]"
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
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div>
          Highest: ${highestSales.amount.toLocaleString()} on{" "}
          {highestSales.date}
        </div>
        <div>
          Period: {salesData.length} {period === "weekly" ? "days" : "weeks"}
        </div>
      </CardFooter>
    </Card>
  );
}
