import { HealthDataService } from "../services/healthData.service.js";
export class HealthDataController {
    static async submitFHIR(req, res) {
        const result = await HealthDataService.storeFHIR(req.body);
        res.json(result);
    }
}
