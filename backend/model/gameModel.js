import mongoose from "mongoose"

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  publisher: { type: String },
  releaseDate: { type: Date },
  rating: { type: Number, min: 0, max: 10 },
  cutyLinks: [{ type: String }], // Multiple Cuty.io links
  accounts: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  added: { type: Date, default: Date.now },
});

const gameModel = mongoose.model("Game", gameSchema);

export default gameModel;