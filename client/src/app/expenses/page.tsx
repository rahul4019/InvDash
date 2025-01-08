"use client";

import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Expense,
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/lib/store/services/api";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { ExpensePieChart } from "@/components/ExpensePieChart";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

interface AggregatedDataItem {
  name: string;
  color?: string;
  amount: number;
}

interface AggregatedData {
  [category: string]: AggregatedDataItem;
}

export default function Expenses() {
  const [category, setCategory] = useState<
    "All" | "Office" | "Professional" | "Salaries"
  >("All");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  useEffect(() => {
    console.log("Date: ", date);
    // console.log("Category: ", category);

    if (date?.from) {
      console.log("FORMATED DATE");
      console.log(format(date.from, "yyyy-MM-dd"));
    }
  }, [category, date]);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();
  const expenses = response?.data;

  const parseDate = (rawDate: string) => {
    return rawDate.split("T")[0];
  };

  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expenses) {
    return (
      <div className="py-4 text-red-500 text-center">
        Failed to fetch Expenses
      </div>
    );
  }
  return (
    <div className="p-4">
      <Header name="Expenses" />
      <p className="text-muted-foreground">
        A visual representation of expenses over time
      </p>
      <div className="flex flex-col gap-4 md:flex-row py-8">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Filter by Category and Date</CardTitle>
          </CardHeader>
          <CardContent>
            {/*  select component */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select
                  onValueChange={(
                    value: "All" | "Office" | "Professional" | "Salaries",
                  ) => setCategory(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Salaries">Salaries</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/*Time range */}
              <div className="flex flex-col gap-2 w-full">
                <Label>Select Time Period</Label>
                <DatePickerWithRange
                  className="w-full"
                  date={date}
                  setDate={setDate}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <ExpensePieChart />
      </div>
    </div>
  );
}
