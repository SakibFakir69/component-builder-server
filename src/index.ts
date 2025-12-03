
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import  type { Request, Response } from 'express'
import globalErrorhandler from './helper/helper.error';
import { notFounded } from './helper/helper.notfouned';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import { userRouter } from './modules/users/user.route';

const app = express();


app.use(
    session({
        secret:"secrect-key",
         resave:false,
         saveUninitialized:false
    })
)

app.use(cookieParser());
app.use(express.json())




// routes 

app.use('/api/v1/user', userRouter);

app.get('/', async (req:Request,  res:Response)=>{

    res.send("server running")
    
})


// listen 



// middlreware

// not founded
app.use(notFounded);


// error
app.use(globalErrorhandler);


export const server= app;

