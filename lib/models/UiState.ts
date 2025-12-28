import mongoose from "mongoose";

const UiStateSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  open: { type: Boolean, default: false },
});

export default mongoose.models.UiState ||
  mongoose.model("UiState", UiStateSchema);
