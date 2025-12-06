import { AuthService } from "../services/auth.service.js";
export function authJWT(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Missing token" });
    try {
        const decoded = AuthService.verifyJWT(token);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({ error: "Invalid token" });
    }
}
