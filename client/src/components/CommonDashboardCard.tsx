import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

export default function CommonDashboardCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          Dues & Pending Orders
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          22 - 29 October 2023
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full">
              <CircleCheck className="h-5 w-5 text-blue-500" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Dues
                </p>
                <p className="text-lg font-bold">250.00</p>
              </div>
              <div className="text-emerald-500 text-sm font-medium">+131%</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Orders
                </p>
                <p className="text-lg font-bold">147</p>
              </div>
              <div className="text-red-500 text-sm font-medium">-56%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
