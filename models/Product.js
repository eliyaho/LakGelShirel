import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  category: { type: String, required: true },
  description: { type: String, required: true },
  sales: { type: Number, default: 0 },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
