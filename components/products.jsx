"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userId = useSelector(state => state.auth.userId);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        // אם השרת מחזיר null / אובייקט / כל דבר לא מערך
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, product }),
      });
      alert("המוצר נוסף לסל הקניות שלך!");
    } else {
      const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");
      const existing = localCart.find(item => item._id === product._id);
      if (existing) existing.quantity += 1;
      else localCart.push({ ...product, quantity: 1 });
      localStorage.setItem("localCart", JSON.stringify(localCart));
      alert("המוצר נוסף לסל המקומי!");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          כל המוצרים
        </h2>

        <div className="mb-8 text-center">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => router.push("/products/add")}
          >
            הוסף מוצר
          </Button>
        </div>

        {/* טעינה */}
        {loading && (
          <p className="text-center text-gray-500">טוען מוצרים...</p>
        )}

        {/* שגיאה */}
        {error && (
          <p className="text-center text-red-500">
            שגיאה בטעינת המוצרים
          </p>
        )}

        {/* אין מוצרים */}
        {!loading && products.length === 0 && !error && (
          <p className="text-center text-gray-500">
            אין מוצרים להצגה כרגע
          </p>
        )}

        {/* מוצרים */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  width={300}
                  height={300}
                  alt={product.name || "product"}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    ₪{Number(product.price || 0).toFixed(2)}
                  </p>

                  <Button
                    className="w-full bg-pink-600 text-white hover:bg-pink-700"
                    onClick={() => handleAddToCart(product)}
                  >
                    הוסף לעגלה
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
