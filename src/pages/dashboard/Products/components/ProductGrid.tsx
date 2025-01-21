import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// This would typically come from an API or database
const products = [
  { id: 1, name: "Product 1", price: 19.99, image: "/placeholder.svg" },
  { id: 2, name: "Product 2", price: 29.99, image: "/placeholder.svg" },
  { id: 3, name: "Product 3", price: 39.99, image: "/placeholder.svg" },
  { id: 4, name: "Product 4", price: 49.99, image: "/placeholder.svg" },
  { id: 5, name: "Product 5", price: 59.99, image: "/placeholder.svg" },
  { id: 6, name: "Product 6", price: 69.99, image: "/placeholder.svg" },
];

export default function ProductGrid() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={200}
              className='rounded-md object-cover'
            />
          </CardHeader>
          <CardContent>
            <CardTitle>{product.name}</CardTitle>
            <Badge variant='secondary' className='mt-2'>
              ${product.price.toFixed(2)}
            </Badge>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
