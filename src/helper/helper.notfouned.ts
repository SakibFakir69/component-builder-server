import { NextFunction, Request, Response } from "express";



export const notFounded = async (req:Request, res:Response, next:NextFunction)=>{
    const url = req.url;

    return res.status(404).json({
      name:`${url} THIS ROUTE NOT FOUNDED`,
      time:new Date().toISOString()
    })



}