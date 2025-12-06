import { Setup } from "@bsv/wallet-toolbox";
import { PrivateKey } from "@bsv/sdk";
const ownerWIF = process.env.OWNER_WIF;
const paymailWIF = process.env.PAYMAIL_WIF;
const identityWIF = process.env.IDENTITY_WIF;
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
                filePath: "",
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
