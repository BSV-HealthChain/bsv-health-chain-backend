import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { CONFIG } from "../config/config";

export class AuthService {
  static async issueJWT(userId: string) {
    return jwt.sign(
      { userId },
      CONFIG.JWT_SECRET,
      { expiresIn: "5d" }
    );
  }

  static verifyJWT(token: string) {
    return jwt.verify(token, CONFIG.JWT_SECRET);
  }

  static async findOrCreate(email: string) {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    return user;
  }
}
