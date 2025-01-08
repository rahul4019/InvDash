import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PurchaseSummarySkeleton() {
  return (
    <CardContent className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-baseline gap-1">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <Skeleton className="h-[100px] w-full" />
    </CardContent>
  );
}
