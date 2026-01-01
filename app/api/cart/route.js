import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, product } = body;

    if (!userId || !product) return new Response(JSON.stringify({ message: "Missing data" }), { status: 400 });

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const index = cart.items.findIndex(item => item.id === product._id);
      if (index > -1) cart.items[index].quantity += 1;
      else cart.items.push({ id: product._id, name: product.name, price: product.price, quantity: 1 });
      await cart.save();
    } else {
      cart = await Cart.create({ userId, items: [{ id: product._id, name: product.name, price: product.price, quantity: 1 }] });
    }

    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (err) {
    console.error("POST CART ERROR:", err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
