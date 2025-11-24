import mongoose from "mongoose";
import { app } from "./app";
import { CONFIG } from "./config/config";

const PORT = 5000;

mongoose.connect(CONFIG.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Mongo DB Connection Error", err);
  });
