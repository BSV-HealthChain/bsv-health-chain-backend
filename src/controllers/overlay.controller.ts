import { Request, Response } from "express";
import { OverlayService } from "../services/overlay.service";

export class OverlayController {
  static async lookupUTXO(req: Request, res: Response) {
    const { txid } = req.params;
    const result = await OverlayService.lookupIndexedUTXO(txid);
    res.json(result);
  }
}
