import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-[70px] w-[70px] rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-[150px]" />
            <div className="flex h-4 gap-2 items-center">
              <Skeleton className="h-4 w-16" />
              <Separator orientation="vertical" className="bg-primary/50" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-primary/20 p-2 rounded-full">
            <ShoppingBag className="w-4 h-4 text-primary" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Separator className="mt-2" />
    </div>
  );
}
