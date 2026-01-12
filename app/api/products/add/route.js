import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const name = formData.get("name");
    const priceStr = formData.get("price");
    const category = formData.get("category");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!name || !priceStr || !category || !description || !image) {
      return NextResponse.json(
        { message: "חסרים שדות חובה" },
        { status: 400 }
      );
    }

    const price = Number(priceStr);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { message: "מחיר לא תקין" },
        { status: 400 }
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "ניתן להעלות רק תמונה" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await image.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    const product = await Product.create({
      name,
      price,
      category,
      description,
      image: imageUrl,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "שגיאת שרת" },
      { status: 500 }
    );
  }
}
