// src/models/Provider.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IProvider extends Document {
  pubKey: string;          // Wallet public key of provider
  name: string;
  type: "institution" | "individual";
  institutionType?: string;
  individualRole?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  specialty?: string;
  contact?: string;
}

const ProviderSchema: Schema = new Schema<IProvider>(
  {
    pubKey: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["institution", "individual"], required: true },
    institutionType: { type: String },
    individualRole: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    description: { type: String },
    specialty: { type: String },
    contact: { type: String },
  },
  { timestamps: true }
);

export const Provider = mongoose.model<IProvider>("Provider", ProviderSchema);
