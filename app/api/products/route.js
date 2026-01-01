import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectDB();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    return new Response(
      JSON.stringify({ message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
