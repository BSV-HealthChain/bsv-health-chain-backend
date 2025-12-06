import { HealthDataService } from "../services/healthData.service.js";
import { Request, Response } from "express";

export class HealthDataController {
  static async submitFHIR(req: Request, res: Response) {
    const result = await HealthDataService.storeFHIR(req.body);
    res.json(result);
  }
}
