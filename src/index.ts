
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import  type { Request, Response } from 'express'
import globalErrorhandler from './helper/helper.error';
import { notFounded } from './helper/helper.notfouned';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import { userRouter } from './modules/users/user.route';
import { authRoute } from './modules/auth/auth.route';
import { promptRouter } from './modules/prompt/prompt.route';


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
// auth
app.use('/api/v1/auth', authRoute);
// prompt
app.use('/api/v1/prompt', promptRouter);


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

