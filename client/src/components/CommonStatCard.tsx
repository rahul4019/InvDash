import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { JSX } from "react";

interface StatDetail {
  title: string;
  amount: string;
  changePercentage: number;
  iconComponent: LucideIcon;
}

interface CommonStatCardProps {
  title: string;
  icon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
}

export default function CommonStatCard({
  title,
  icon,
  details,
  dateRange,
}: CommonStatCardProps) {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const iconColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="text-sm text-muted-foreground">{dateRange}</div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex items-center">
            <div className="bg-primary/20 p-3 rounded-full">{icon}</div>
          </div>

          <div className="flex-1 space-y-8">
            {details.map((detail, index) => (
              <div key={index} className="flex">
                <div className="w-full flex justify-between items-center ">
                  <p className="text-sm font-bold text-muted-foreground">
                    {detail.title}
                  </p>
                  <p className="text-lg font-bold">{detail.amount}</p>
                  <div className="flex text-sm font-medium items-center">
                    <detail.iconComponent
                      className={`${iconColor(detail?.changePercentage)} mr-1`}
                      size={16}
                    />
                    <span
                      className={`font-semibold ${iconColor(detail.changePercentage)}`}
                    >
                      {formatPercentage(detail.changePercentage)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
