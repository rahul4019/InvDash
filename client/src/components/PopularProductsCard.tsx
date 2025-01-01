import Image from "next/image";
import { Star, StarHalf, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Define the structure for a product
interface Product {
  id: number;
  title: string;
  image: string;
  rating: number;
  unitsSold: number;
}

// Sample data for popular products
const popularProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Earbuds",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
    unitsSold: 1234,
  },
  {
    id: 2,
    title: "Smart Watch",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.2,
    unitsSold: 987,
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    unitsSold: 1567,
  },
  {
    id: 4,
    title: "Laptop Stand",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.1,
    unitsSold: 765,
  },
  {
    id: 5,
    title: "Phone Case",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.3,
    unitsSold: 2345,
  },
  {
    id: 6,
    title: "Portable Charger",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    unitsSold: 1876,
  },
];

// Component to render star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export function PopularProductsCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Popular Products</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ScrollArea className="h-[400px] pr-2">
          <div className="space-y-4">
            {popularProducts.map((product, index) => (
              <div key={product.id}>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={70}
                      height={70}
                      className="rounded-md object-cover"
                    />
                    <div className="space-y-1">
                      <h3 className="font-medium leading-none">
                        {product.title}
                      </h3>
                      <StarRating rating={product.rating} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">
                      {product.unitsSold.toLocaleString()}
                    </span>
                  </div>
                </div>
                {index < popularProducts.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
