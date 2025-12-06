import { Router } from "express";
import { WalletController } from "../controllers/wallet.controller.js";
const router = Router();
router.get("/connect", WalletController.connect);
router.get("/utxos/:address", WalletController.utxos);
router.post("/broadcast", WalletController.broadcast);
export default router;
