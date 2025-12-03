import { NextFunction, Request, Response } from "express";

interface IError extends Error {
  statusCode: number;
  status: string;
}

const globalErrorhandler = (error: IError, req:Request, res: Response , next:NextFunction) => {
  const statusCode = error?.statusCode || 500;
  const status = error?.status || "error";
  const stack = error?.stack;
  const message = error?.message;

  return res.status(statusCode).json({
    statusCode,
    status,
    message,
    stack: process.env.NODE_ENV === "development" && stack,
  });
};

export default globalErrorhandler;
