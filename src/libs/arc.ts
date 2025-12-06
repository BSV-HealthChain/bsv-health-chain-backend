import axios from "axios";
import { CONFIG } from "../config/config.js";

export async function broadcastTx(rawtx: string) {
  const url = `${CONFIG.ARC_URL}/v1/tx`;

  const res = await axios.post(url, { rawtx });
  return res.data;
}
