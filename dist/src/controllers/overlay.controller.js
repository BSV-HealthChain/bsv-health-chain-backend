import { OverlayService } from "../services/overlay.service.js";
export class OverlayController {
    static async lookupUTXO(req, res) {
        const { txid } = req.params;
        const result = await OverlayService.lookupIndexedUTXO(txid);
        res.json(result);
    }
}
