import { PrivateKey } from "@bsv/sdk";
import fs from "fs";
import path from "path";

/**
 * Generate a valid private key + public key + address set.
 * Uses only safe SDK cryptographic methods.
 */
function makeKey() {
  const key = PrivateKey.fromRandom();      // Generates valid EC private key
  const wif = key.toWif();                  // Always compressed in @bsv/sdk
  const publicKey = key.toPublicKey();
  const pub = publicKey.toString();         // Valid compressed public key hex
  const addr = publicKey.toAddress().toString();  // P2PKH address

  return { wif, pub, addr };
}

/**
 * Create all wallet roles
 */
const keys = {
  ownerPrivateKey: makeKey(),
  paymailPrivateKey: makeKey(),
  identityPrivateKey: makeKey(),
};

/**
 * Safe path: ensures JSON is written to the *source* folder,
 * and when compiled, it resolves correctly in dist/src.
 */
const filePath = path.join(process.cwd(), "src", "secrets.json");

// Write file
fs.writeFileSync(filePath, JSON.stringify(keys, null, 2));

console.log("Generated valid compressed WIF key set:");
console.log(keys);
