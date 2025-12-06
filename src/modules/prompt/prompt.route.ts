import { Router } from "express";
import { promptController } from "./prompt.controller";
import { verifyJwtToken } from "../../middleware/verifyJwtToken";


const router = Router();


router.post('/create-prompt',verifyJwtToken, promptController.createPrompt)
router.get('/chat-history',verifyJwtToken, promptController.chatHistory);

export const promptRouter = router;