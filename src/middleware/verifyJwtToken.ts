import { AuthUser } from './../types/express.d';
// src/middleware/verifyJwtToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  console.log(token)

  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = decoded as AuthUser;
    next();
  });
};