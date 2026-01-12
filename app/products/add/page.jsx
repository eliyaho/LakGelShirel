"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const categories = ["לקים", "מכשור", "ציוד נלווה"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("בחר תמונה לפני שמירת המוצר!");
      return;
    }

    const finalCategory = category === "other" ? customCategory : category;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", finalCategory);
    formData.append("description", description);
    formData.append("image", imageFile);

    const res = await fetch("/api/products/add", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("המוצר נוסף בהצלחה!");
      router.push("/products");
    } else {
      const data = await res.json();
      alert("שגיאה: " + data.message);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-md px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          הוסף מוצר חדש
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="שם מוצר"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border rounded"
          />

          <input
            type="number"
            placeholder="מחיר"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="p-2 border rounded"
          />

          {/* העלאת תמונה */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            className="p-2 border rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 border rounded"
          >
            <option value="">בחר קטגוריה</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="other">אחר</option>
          </select>

          {category === "other" && (
            <input
              type="text"
              placeholder="הכנס קטגוריה חדשה"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
              className="p-2 border rounded"
            />
          )}

          <textarea
            placeholder="תיאור"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-2 border rounded"
          />

          <Button
            type="submit"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            הוסף מוצר
          </Button>
        </form>
      </div>
    </section>
  );
}
