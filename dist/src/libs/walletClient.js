import { Setup } from "@bsv/wallet-toolbox";
import { PrivateKey } from "@bsv/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to secrets.json
const secretsPath = path.join(__dirname, "../secrets.json");
if (!fs.existsSync(secretsPath)) {
    throw new Error("❌ secrets.json not found! Generate dev keys before initializing the wallet.");
}
// Read and parse secrets.json
const secrets = JSON.parse(fs.readFileSync(secretsPath, "utf8"));
// Extract WIFs
const ownerWIF = secrets.ownerPrivateKey.wif;
const paymailWIF = secrets.paymailPrivateKey.wif;
const identityWIF = secrets.identityPrivateKey.wif;
// Create PrivateKey instances
const identityPrivateKey = PrivateKey.fromWif(identityWIF);
const identityPublicKeyHex = identityPrivateKey.toPublicKey().toString(); // compressed hex
const identityAddress = identityPrivateKey.toAddress().toString();
// Lazy wallet client initialization
let walletClient = null;
export async function initializeWalletClient() {
    if (walletClient)
        return walletClient;
    try {
        walletClient = Setup.createWalletClient({
            env: {
                chain: "main",
                identityKey: identityPublicKeyHex, // ✅ pass compressed public key hex
                identityKey2: "", // optional
                filePath: secretsPath,
                taalApiKey: "", // leave empty if not used
                devKeys: {
                    ownerPrivateKey: ownerWIF,
                    paymailPrivateKey: paymailWIF,
                    identityPrivateKey: identityWIF,
                },
                mySQLConnection: "", // leave empty if not used
            },
        });
        console.log("======================================");
        console.log("🚀 Wallet Initialized Successfully");
        console.log("📍 secrets.json path:", secretsPath);
        console.log("🔑 Identity Public Key:", identityPublicKeyHex);
        console.log("🏠 Identity Address:", identityAddress);
        console.log("📬 Owner Address:", PrivateKey.fromWif(ownerWIF).toAddress().toString());
        console.log("📬 Paymail Address:", PrivateKey.fromWif(paymailWIF).toAddress().toString());
        console.log("======================================");
        return walletClient;
    }
    catch (err) {
        console.error("❌ Failed to initialize wallet client:", err);
        throw err;
    }
}
// Optional helper
export function getIdentityAddress() {
    return identityAddress;
}
