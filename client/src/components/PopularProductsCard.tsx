import Image from "next/image";
import { Star, StarHalf, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetDashboardMetricsQuery } from "@/lib/store/services/api";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

// Component to render star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-500 text-foreground/50" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-amber-500 text-foreground/50" />
      )}
      <span className="text-sm">{Number(rating).toFixed(1)}</span>
    </div>
  );
};

export function PopularProductsCard() {
  const { data: response, isLoading } = useGetDashboardMetricsQuery();
  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader>
        <CardTitle>Popular Products</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ScrollArea className="h-[400px] pr-2">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-4">
              {response?.data?.popularProducts.map((product, index) => (
                <div key={product.productId}>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/invdash.png"
                        alt={product.name}
                        width={70}
                        height={70}
                        className="rounded-md object-cover"
                      />
                      <div className="space-y-1">
                        <h3 className="font-medium leading-none">
                          {product.name}
                        </h3>
                        <div className="flex h-4 gap-2">
                          <p className="text-primary font-semibold text-sm">
                            ${product.price}
                          </p>
                          <Separator
                            orientation="vertical"
                            className="bg-primary/50"
                          />
                          <StarRating rating={product.rating!} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <ShoppingBag className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round(product.stockQuantity / 1000)}k Sold
                      </span>
                    </div>
                  </div>
                  <Separator className="mt-2" />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
