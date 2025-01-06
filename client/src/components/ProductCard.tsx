import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  price: string;
  stock: number;
  rating: number;
}

export default function ProductCard({
  name,
  price,
  stock,
  rating,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-xs overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-1">{name}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold">${price}</span>
          <Badge variant="secondary">Stock: {stock}</Badge>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating.toFixed(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
