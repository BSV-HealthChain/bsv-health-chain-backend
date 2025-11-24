import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  walletAddress: { type: String },
  role: { type: String, default: "patient" },
  jwtIssuedAt: { type: Number }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
