import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

export function authJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = AuthService.verifyJWT(token);
    (req as any).user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
}
