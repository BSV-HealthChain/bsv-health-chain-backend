import { Request, Response } from "express";
import { initializeWalletClient } from "../libs/walletClient.js";
import { broadcastTx } from "../libs/arc.js";
import { WalletService } from "../services/wallet.service.js";

export class WalletController {

  // Connect and return wallet session
  static async connect(req: Request, res: Response) {
    try {
      const walletClient = await initializeWalletClient(); // ✅ lazy-init
      res.json({
        message: "Wallet connected successfully",
        session: walletClient,
      });
    } catch (error) {
      console.error("Wallet connection error:", error);
      res.status(500).json({ error: "Failed to connect wallet" });
    }
  }

  // Get UTXOs for a given address
  static async utxos(req: Request, res: Response) {
    try {
      const { address } = req.params;
      const utxos = await WalletService.getUtxos(address);
      res.json(utxos);
    } catch (error) {
      console.error("UTXOs fetch error:", error);
      res.status(500).json({ error: "Failed to fetch UTXOs" });
    }
  }

  // Broadcast raw transaction
  static async broadcast(req: Request, res: Response) {
    try {
      const { rawtx } = req.body;
      const broadcast = await broadcastTx(rawtx);
      res.json(broadcast);
    } catch (error) {
      console.error("Broadcast error:", error);
      res.status(500).json({ error: "Failed to broadcast transaction" });
    }
  }
}
