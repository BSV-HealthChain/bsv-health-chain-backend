import { HealthDataService } from "../services/healthData.service.js";
import { Request, Response } from "express";
import { HealthRecord, IHealthRecord } from "../models/HealthRecord.js";
import { Provider, IProvider } from "../models/Provider.js";

export class HealthRecordController {
  // Submit FHIR data
  static async submitFHIR(req: Request, res: Response) {
    try {
      const { pubKey, txid, rawTx, formHash, formData } = req.body;

      if (!pubKey || !txid || !rawTx || !formHash || !formData) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newRecord: IHealthRecord = new HealthRecord({
        pubKey,
        patientName: formData.patientName,
        age: formData.age,
        gender: formData.gender,
        diagnosis: formData.diagnosis,
        notes: formData.notes,
        formHash,
        txid,
        rawTx,
      });

      await newRecord.save();

      return res.status(201).json({ message: "FHIR data submitted successfully", recordId: newRecord._id });
    } catch (error: any) {
      console.error("submitFHIR error:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

static async getPatientRecords(req: Request, res: Response) {
    try {
      const { pubKey } = req.params;
      if (!pubKey) return res.status(400).json({ message: "Missing pubKey" });

      const records = await HealthRecord.find({ pubKey }).sort({ createdAt: -1 });
      return res.status(200).json(records);
    } catch (error: any) {
      console.error("getPatientRecords error:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}
export class ProviderController {
  // Register a provider
  static async registerProvider(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!data.pubKey || !data.name || !data.type) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if provider already exists
      const existing = await Provider.findOne({ pubKey: data.pubKey });
      if (existing) {
        return res.status(409).json({ message: "Provider already registered" });
      }

      const newProvider: IProvider = new Provider(data);
      await newProvider.save();

      return res.status(201).json({ message: "Provider registered successfully", providerId: newProvider._id });
    } catch (error: any) {
      console.error("registerProvider error:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  // Fetch provider by pubKey
  static async getProviderByPubKey(req: Request, res: Response) {
    try {
      const { pubKey } = req.params;
      if (!pubKey) return res.status(400).json({ message: "Missing pubKey" });

      const provider = await Provider.findOne({ pubKey });
      if (!provider) return res.status(404).json({ message: "Provider not found" });

      return res.status(200).json(provider);
    } catch (error: any) {
      console.error("getProviderByPubKey error:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}