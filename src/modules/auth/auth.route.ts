import { Router } from "express";
import { authController } from "./auth.controller";
import { verifyJwtToken } from "../../middleware/verifyJwtToken";



const router = Router();
// login 
// logout 
// me 
// verifytoken


router.post('/login-user', authController.loginUser);
router.get('/me',verifyJwtToken ,  authController.me);
router.post('/logout', verifyJwtToken, authController.logout)



export const authRoute = router;