"use client";

import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetExpensesByCategoryQuery } from "@/lib/store/services/api";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";

export default function Expenses() {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();
  const expenses = response?.data;

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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Filter by Category and Date</CardTitle>
          </CardHeader>
          <CardContent>
            {/*  select component */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select defaultValue="All">
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
                <DatePickerWithRange className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Filter by Category and Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Label className="text-sm font-medium text-foreground">
              Category
            </Label>
            <Select defaultValue="All">
              <SelectTrigger className="w-[180px]">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
