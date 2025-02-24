import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-[600px]">
      <Image
        src="/placeholder.svg?height=600&width=1600"
        alt="תמונת רקע של לק"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">גלי את היופי שבך</h1>
          <p className="text-xl mb-8">מגוון מוצרי לק איכותיים לציפורניים מושלמות</p>
          <Button size="lg" className="bg-pink-600 text-white hover:bg-pink-700">
            לקנייה עכשיו
          </Button>
        </div>
      </div>
    </section>
  )
}

