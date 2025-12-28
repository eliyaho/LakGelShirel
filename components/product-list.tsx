import Image from "next/image"
import { Button } from "@/components/ui/button"

const products = [
  { id: 1, name: "לק ורוד עדין", price: 39.99, image: "/placeholder.svg?height=300&width=300" },
  { id: 2, name: "לק אדום קלאסי", price: 39.99, image: "/placeholder.svg?height=300&width=300" },
  { id: 3, name: "לק כחול ים", price: 39.99, image: "/placeholder.svg?height=300&width=300" },
  { id: 4, name: "לק סגול מנצנץ", price: 44.99, image: "/placeholder.svg?height=300&width=300" },
]

export default function ProductList() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">המוצרים שלנו</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">₪{product.price.toFixed(2)}</p>
                <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">הוסף לעגלה</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

