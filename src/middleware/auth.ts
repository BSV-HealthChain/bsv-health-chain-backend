import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { secrets } from "../../secrets.js";

export class AuthService {
  static async issueJWT(userId: string) {
    return jwt.sign(
      { userId },
      secrets.JWT_SECRET,
      { expiresIn: "5d" }
    );
  }

  static verifyJWT(token: string) {
    return jwt.verify(token, secrets.JWT_SECRET);
  }

  static async findOrCreate(email: string) {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    return user;
  }
}
