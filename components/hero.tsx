"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    src: "/placeholder.svg?height=600&width=1600",
    title: "גלי את היופי שבך",
    description: "מגוון מוצרי לק איכותיים לציפורניים מושלמות",
  },
  {
    src: "/placeholder.svg?height=600&width=1600&text=Slide+2",
    title: "צבעים שמדברים סטייל",
    description: "קולקציות חדשות ומרשימות",
  },
  {
    src: "/placeholder.svg?height=600&width=1600&text=Slide+3",
    title: "איכות שמחזיקה",
    description: "לקים עמידים לאורך זמן",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-xl mb-8">{slide.description}</p>
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                לקנייה עכשיו
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows – desktop only */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === current ? "bg-pink-600 scale-110" : "bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
