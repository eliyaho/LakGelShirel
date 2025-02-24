import Header from "@/components/header"
import Hero from "@/components/hero"
import ProductList from "@/components/product-list"
import About from "@/components/about"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductList />
        <About />
      </main>
      <Footer />
    </div>
  )
}

