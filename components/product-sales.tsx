import Image from "next/image"
import { Button } from "@/components/ui/button"

const products = [
  { id: 1, name: "Electric Dreams", price: 14.99, image: "/placeholder.svg?height=300&width=300", color: "neonPink" },
  { id: 2, name: "Cyber Shimmer", price: 16.99, image: "/placeholder.svg?height=300&width=300", color: "neonBlue" },
  { id: 3, name: "Neon Nights", price: 14.99, image: "/placeholder.svg?height=300&width=300", color: "neonGreen" },
  { id: 4, name: "Glitch Glam", price: 15.99, image: "/placeholder.svg?height=300&width=300", color: "neonYellow" },
]

export default function ProductSales() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-center animate-pulse">
          <span className="text-neonPink">Trending</span>
          <span className="text-neonBlue"> Nail</span>
          <span className="text-neonGreen"> Polishes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-black border-2 border-${product.color} rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="relative h-64">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className={`font-semibold text-xl mb-2 text-${product.color}`}>{product.name}</h3>
                <p className="text-white mb-4">${product.price.toFixed(2)}</p>
                <Button
                  className={`w-full bg-${product.color} text-black hover:bg-black hover:text-${product.color} border border-${product.color}`}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

