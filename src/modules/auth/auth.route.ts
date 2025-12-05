import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();
// login 
// logout 
// me 
// verifytoken


router.post('/login-user', authController.loginUser);
router.get('/me', authController.me);


export const authRoute = router;