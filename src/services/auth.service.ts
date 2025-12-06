import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export class AuthService {
  static async issueJWT(userId: string) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "5d" }
    );
  }

  static verifyJWT(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }

  static async findOrCreate(email: string) {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    return user;
  }
}
