import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth.routes';
import walletRoutes from './routes/wallet.routes';
import healthDataRoutes from './routes/healthData.routes';
import overlayRoutes from './routes/overlay.routes';

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
