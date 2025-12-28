import Image from "next/image"
import { Button } from "@/components/ui/button"

const courses = [
  {
    id: 1,
    name: "Neon Nail Art Mastery",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=600",
    color: "neonPink",
  },
  {
    id: 2,
    name: "Holographic Designs",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=600",
    color: "neonBlue",
  },
]

export default function DigitalCourses() {
  return (
    <section className="py-16 bg-gradient-to-r from-neonPink via-neonBlue to-neonGreen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-black animate-pulse">Level Up Your Nail Game!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-black rounded-lg overflow-hidden shadow-lg transform hover:rotate-3 transition-transform duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-75"
                />
              </div>
              <div className="p-6">
                <h3 className={`font-semibold text-2xl mb-2 text-${course.color}`}>{course.name}</h3>
                <p className="text-white mb-4">
                  Master mind-blowing nail art techniques from our galaxy-class instructors!
                </p>
                <p className={`text-3xl font-bold mb-4 text-${course.color}`}>${course.price.toFixed(2)}</p>
                <Button
                  className={`w-full bg-${course.color} text-black hover:bg-black hover:text-${course.color} border border-${course.color}`}
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

