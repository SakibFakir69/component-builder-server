import { Router } from "express";
import { paymentController } from "./payment.controller";
import { verifyJwtToken } from "../../middleware/verifyJwtToken";

const route = Router();

// Step 1: Create payment (needs login)
route.post('/create-payment', verifyJwtToken, paymentController.createPayment);

// Step 2: After Stripe payment success (NO token needed)
route.post('/confirm-payment', paymentController.confirmPayment);

// Step 3: Get user's own payments (needs login)
route.get('/get-payment', verifyJwtToken, paymentController.getPayment);

export const paymentRoutes = route;
