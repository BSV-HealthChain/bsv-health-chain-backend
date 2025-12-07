import { Router } from "express";
import { HealthRecordController } from "../controllers/healthData.controller.js";
import { ProviderController } from "../controllers/healthData.controller.js";

const router = Router();

router.post("/submit-fhir", HealthRecordController.submitFHIR);
router.get("/:pubKey", HealthRecordController.getPatientRecords);

router.post("/register", ProviderController.registerProvider);
router.get("/:pubKey", ProviderController.getProviderByPubKey);

export default router;
