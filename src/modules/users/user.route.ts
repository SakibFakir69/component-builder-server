import { Router } from "express";
import { userController } from "./user.controller";



const router = Router();


router.post('/create-user', userController.createUser);
// router.put("/update-user");
// router.delete('/delete-user');



export const userRouter = router;
