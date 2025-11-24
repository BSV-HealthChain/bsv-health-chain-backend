import { Setup } from "@bsv/wallet-toolbox";

export const walletClient = Setup.createWalletClient({
  appName: "BSV HealthChain",
  appDescription: "Healthcare Data + Tokenization on BSV"
});
