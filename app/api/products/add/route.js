import { connectMongo } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();

    const product = await Product.create(body);

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    return new Response(
      JSON.stringify({ message: err.message }),
      { status: 500 }
    );
  }
}
