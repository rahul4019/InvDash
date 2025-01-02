import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Box, TrendingDown, TrendingUp } from "lucide-react";

export default function CommonDashboardCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex">
          <div>Sales & Discount </div>
          <div className="font-medium text-sm text-gray-400">29-12-2024</div>
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
