import axios from "axios";
import { CONFIG } from "../../config/config.js";

export class WalletService {
  static async getUtxos(address: string) {
    const url = `${CONFIG.WOC_API}/address/${address}/unspent`;
    const { data } = await axios.get(url);
    return data;
  }
}
