import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SalesSummaryCardSkeleton() {
  return (
    <div className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2 h-full">
          <Skeleton className="w-full h-[250px]" />
        </div>
        <div className="mt-4 flex justify-between">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="h-4 w-[120px]" />
          ))}
        </div>
      </CardContent>
    </div>
  );
}
