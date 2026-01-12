"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // ניתן לבחור מוצרים רנדומליים אם רוצים
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled);

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-16">טוען מוצרים...</p>;
  if (error) return <p className="text-center py-16 text-red-500">שגיאה בטעינת המוצרים</p>;
  if (!products.length) return <p className="text-center py-16 text-gray-500">אין מוצרים להצגה כרגע</p>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">המוצרים שלנו</h2>

        <div className="grid gap-8 justify-items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 w-full max-w-[300px]"
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
                <p className="text-gray-600 mb-4">₪{Number(product.price || 0).toFixed(2)}</p>
                <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">
                  הוסף לעגלה
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
