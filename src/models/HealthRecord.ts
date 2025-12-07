// src/models/HealthRecord.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IHealthRecord extends Document {
  pubKey: string;        // Wallet public key of patient
  patientName: string;
  age: string;
  gender: string;
  diagnosis: string;
  notes: string;
  formHash: string;      // SHA256 hash of form data
  txid: string;          // Blockchain transaction ID for submission
  rawTx: string;         // Raw transaction hex
}

const HealthRecordSchema: Schema = new Schema<IHealthRecord>(
  {
    pubKey: { type: String, required: true },
    patientName: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    diagnosis: { type: String, required: true },
    notes: { type: String },
    formHash: { type: String, required: true },
    txid: { type: String, required: true },
    rawTx: { type: String, required: true },
  },
  { timestamps: true }
);

export const HealthRecord = mongoose.model<IHealthRecord>(
  "HealthRecord",
  HealthRecordSchema
);
