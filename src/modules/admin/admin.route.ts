import { Router } from "express";
import { adminController } from "./admin.controller";
import { roleChecker } from "../../middleware/roleChecker";
const router = Router();


router.get("/payments", adminController.allPayment);


router.get("/users",roleChecker, adminController.allUser);
router.get("/users/payments/:userId", adminController.userPaymentAndUserDetails);

router.delete("/users/:id",roleChecker, adminController.deleteUser);

router.get('/dashboard', adminController.dashboardInfo);

router.get('/users-graph',adminController.userGraph)
router.get('/payments-graph', adminController.paymentGraph)

export const adminRoutes = router;
