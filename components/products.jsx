"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        // קיבוץ לפי קטגוריה
        const grouped = {};
        data.forEach((product) => {
          const category = product.category || "ללא קטגוריה";
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(product);
        });

        setGroupedProducts(grouped);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, product }),
        });
        alert("המוצר נוסף לסל הקניות שלך!");
      } catch {
        alert("שגיאה בהוספת מוצר לעגלה");
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");
      const existing = localCart.find((item) => item.id === product._id);
      if (existing) existing.quantity += 1;
      else
        localCart.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
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

        <div className="mb-10 text-center">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => router.push("/products/add")}
          >
            הוסף מוצר
          </Button>
        </div>

        {loading && <p className="text-center text-gray-500">טוען מוצרים...</p>}
        {error && <p className="text-center text-red-500">שגיאה בטעינת המוצרים</p>}

        {!loading && !error && Object.keys(groupedProducts).length === 0 && (
          <p className="text-center text-gray-500">אין מוצרים להצגה כרגע</p>
        )}

        {/* תצוגה לפי קטגוריות */}
        {Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className="mb-14">
            <h3 className="text-2xl font-bold mb-6 border-b pb-2">
              {category}
            </h3>

            <div
              className="grid gap-8 justify-items-center"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform w-full max-w-[300px]"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    width={300}
                    height={300}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2 text-gray-800">
                      {product.name}
                    </h4>

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
          </div>
        ))}
      </div>
    </section>
  );
}
