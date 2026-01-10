import { Router } from "express";
import { adminController } from "./admin.controller";
const router = Router();

// Get all payments
router.get("/payments", adminController.allPayment);

// Get all users
router.get("/users", adminController.allUser);

// Delete a user by ID
router.delete("/users/:id", adminController.deleteUser);

export const adminRoutes = router;
