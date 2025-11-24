import { Request, Response } from "express";
import { walletClient } from "../libs/walletClient";
import { broadcastTx } from "../libs/arc";
import { WalletService } from "../services/wallet.service";

export class WalletController {

  static async connect(req: Request, res: Response) {
    const session = await walletClient.createSession();
    res.json(session);
  }

  static async utxos(req: Request, res: Response) {
    const { address } = req.params;
    const utxos = await WalletService.getUtxos(address);
    res.json(utxos);
  }

  static async broadcast(req: Request, res: Response) {
    const { rawtx } = req.body;
    const broadcast = await broadcastTx(rawtx);
    res.json(broadcast);
  }
}
