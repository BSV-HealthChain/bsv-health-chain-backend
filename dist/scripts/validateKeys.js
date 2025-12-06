import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { PrivateKey } from "@bsv/sdk";
// ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const secretsPath = path.join(__dirname, "../../secrets.json");
console.log("Reading secrets.json from:", secretsPath);
const raw = fs.readFileSync(secretsPath, "utf8");
console.log("File content:\n", raw);
const secrets = JSON.parse(raw);
// --- DO NOT MODIFY STRING BEFORE VALIDATION ---
function validateWIF(name, wif) {
    try {
        // THIS is correct — throws if invalid
        PrivateKey.fromWif(wif.trim());
        console.log(`✔️ ${name} is VALID WIF`);
    }
    catch (err) {
        console.error(`❌ ${name} is INVALID WIF!`, err.message);
    }
}
validateWIF("ownerPrivateKey", secrets.ownerPrivateKey);
validateWIF("paymailPrivateKey", secrets.paymailPrivateKey);
validateWIF("identityPrivateKey", secrets.identityPrivateKey);
