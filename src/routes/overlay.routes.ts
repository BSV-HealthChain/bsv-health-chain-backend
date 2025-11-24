import { Router } from "express";
import { OverlayController } from "../controllers/overlay.controller";

const router = Router();

router.get("/lookup-utxo/:txid", OverlayController.lookupUTXO);

export default router;
