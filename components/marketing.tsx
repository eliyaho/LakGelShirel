import Image from "next/image"

export default function Marketing() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Gal Nail Polish founder"
              width={600}
              height={600}
              className="rounded-full border-4 border-neonPink animate-spin-slow"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neonPink via-neonBlue to-neonGreen animate-pulse">
              Meet the Nail Wizard: Gal Johnson
            </h2>
            <p className="text-neonYellow mb-4 text-lg">
              Gal isn't just a nail artist; she's a color alchemist, a trend prophet, and a fingertip revolutionary!
              With a PhD in Nail Awesomeness and years of experience painting the tiniest canvases, Gal has crafted a
              line of nail polishes that will make your fingers look like they've been touched by a rainbow-powered
              unicorn.
            </p>
            <p className="text-neonOrange text-lg">
              Join our technicolor tribe of nail enthusiasts and let's paint the world one fabulous fingernail at a
              time! Whether you're a beginner or a nail ninja, our courses will take your skills from "meh" to "OMG!"
              faster than you can say "quick-dry topcoat."
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-neonPink via-neonBlue to-neonGreen opacity-20 animate-pulse"></div>
    </section>
  )
}

