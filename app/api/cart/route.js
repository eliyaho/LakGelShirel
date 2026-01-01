import { connectMongo } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req) {
  await connectMongo();
  const body = await req.json();
  const { userId, product } = body;

  if (!userId || !product) return new Response(JSON.stringify({ message: "Missing data" }), { status: 400 });

  const Cart = mongoose.models.Cart || mongoose.model("Cart", new mongoose.Schema({
    userId: String,
    items: [{ id: Number, name: String, price: Number, quantity: Number }]
  }));

  const userCart = await Cart.findOne({ userId });

  if (userCart) {
    const existingIndex = userCart.items.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      userCart.items[existingIndex].quantity += 1;
    } else {
      userCart.items.push({ ...product, quantity: 1 });
    }
    await userCart.save();
  } else {
    await Cart.create({ userId, items: [{ ...product, quantity: 1 }] });
  }

  return new Response(JSON.stringify({ message: "Added to cart" }), { status: 200 });
}
