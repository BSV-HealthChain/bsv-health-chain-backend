import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json' with { type: "json" };
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import walletRoutes from './routes/wallet.routes.js';
import healthDataRoutes from './routes/healthData.routes.js';
import overlayRoutes from './routes/overlay.routes.js';
export const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/health", healthDataRoutes);
app.use("/api/overlay", overlayRoutes);
// Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(errorHandler);
