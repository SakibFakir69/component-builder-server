import { Response } from "express";



export const ReturnResponse =<T> (res:Response, statusCode:number, message:string, data?:T)=>{


    return res.status(statusCode).json({
        status:statusCode, 
        message:message,
        data:data

    })


}