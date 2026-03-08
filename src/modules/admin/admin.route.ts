import { Router } from "express";
import { adminController } from "./admin.controller";
import { roleChecker } from "../../middleware/roleChecker";
const router = Router();

// Get all payments
router.get("/payments", adminController.allPayment);

// Get all users
// search my email and make indexing for search by email and crud 
router.get("/users",roleChecker, adminController.allUser);

router.get("/users/payments/:userId", adminController.userPaymentAndUserDetails);
// Delete a user by ID
router.delete("/users/:id",roleChecker, adminController.deleteUser);

router.get('/dashboard', adminController.dashboardInfo);



export const adminRoutes = router;
