import { Router } from "express";
import { HealthDataController } from "../controllers/healthData.controller.js";
const router = Router();
router.post("/submit-fhir", HealthDataController.submitFHIR);
export default router;
