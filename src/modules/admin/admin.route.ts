import { Router } from "express";
import { adminController } from "./admin.controller";
const router = Router();

// Get all payments
router.get("/payments", adminController.allPayment);

// Get all users
// search my email and make indexing for search by email and crud 
router.get("/users", adminController.allUser);
router.get('/user/payment/:id', adminController.userPaymentAndUserDetails);
// Delete a user by ID
router.delete("/users/:id", adminController.deleteUser);

export const adminRoutes = router;
