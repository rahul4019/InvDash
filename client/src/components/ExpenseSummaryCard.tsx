"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Label } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import React from "react";
import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/lib/store/services/api";

interface ExpenseSums {
  [category: string]: number;
}

const chartConfig = {
  expenses: {
    label: "Expenses",
  },
  officeExpense: {
    label: "Office Expenses",
    color: "hsl(var(--chart-1))",
  },
  professionalExpenses: {
    label: "Professional Expenses",
    color: "hsl(var(--chart-2))",
  },
  salariesExpenses: {
    label: "Salaries Expenses",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function ExpenseSummary() {
  const { data: response, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = response?.data?.expenseSummary[0];

  const expenseByCategorySummary =
    response?.data?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses";
      const amount = item.amount;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    },
    {},
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([key, value], index) => ({
      name: key,
      value: value,
      fill: `hsl(var(--chart-${index + 1}))`,
    }),
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0,
  );

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Expense Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-around">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ChartContainer
              config={chartConfig}
              className="h-[120px] aspect-square !p-0 !m-0"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={expenseCategories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={55}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-xl font-bold"
                            >
                              ${totalExpenses.toFixed(0)}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-2 lg:gap-4">
              {expenseCategories.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <span
                    className={`w-3 h-3 rounded-full bg-chart-${index + 1}`}
                  />
                  <span className="md:text-xs xl:text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-muted-foreground -mt-5">
        <div>
          <p className="text-muted-foreground">Average:</p>
          <p className="text-xs font-semibold">
            ${expenseSummary?.totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2 items-center text-green-500">
          <TrendingUp size={16} />
          <span className="text-sm font-semibold">40%</span>
        </div>
      </CardFooter>
    </Card>
  );
}
