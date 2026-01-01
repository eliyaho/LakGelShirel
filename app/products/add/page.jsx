"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // כאן המקום לשלוח את הנתונים ל-API
    const res = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        image,
        category,
        description,
      }),
    });

    if (res.ok) {
      alert("המוצר נוסף בהצלחה!");
      router.push("/products"); // חזרה לדף מוצרים
    } else {
      const data = await res.json();
      alert("שגיאה: " + data.message);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-md px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">הוסף מוצר חדש</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="שם מוצר" value={name} onChange={e => setName(e.target.value)} required className="p-2 border rounded"/>
          <input type="number" placeholder="מחיר" value={price} onChange={e => setPrice(e.target.value)} required className="p-2 border rounded"/>
          <input type="text" placeholder="URL תמונה" value={image} onChange={e => setImage(e.target.value)} className="p-2 border rounded"/>
          <input type="text" placeholder="קטגוריה" value={category} onChange={e => setCategory(e.target.value)} required className="p-2 border rounded"/>
          <textarea placeholder="תיאור" value={description} onChange={e => setDescription(e.target.value)} required className="p-2 border rounded"/>
          <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">הוסף מוצר</Button>
        </form>
      </div>
    </section>
  );
}
