import mongoose from "mongoose";
import { app } from "./app.js";
import { secrets } from "../secrets.js";
import { initializeWalletClient } from "./libs/walletClient.js";

async function startServer() {
  const walletClient = await initializeWalletClient();
  // now use walletClient safely
}

const PORT = 5000;

mongoose.connect(secrets.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Mongo DB Connection Error", err);
  });
