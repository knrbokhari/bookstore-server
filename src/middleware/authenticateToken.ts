import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY || "secretKey";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
    });

  jwt.verify(token, secretKey, (err) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid token!" });
    next();
  });
}

export default authenticateToken;
