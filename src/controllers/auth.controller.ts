import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email } = req.body;

    const user = await AuthService.findOrCreate(email);
    const token = await AuthService.issueJWT(user._id.toString());

    res.json({ token, user });
  }
}
