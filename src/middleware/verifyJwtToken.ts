import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const jwtToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.cookie ||  req.headers.authorization;

  if(!accessToken)
  {
      return res.status(401).json({ message: "No access token provided" });
  }

  // verify jwt

  jwt.verify(accessToken, "secrect-key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};
