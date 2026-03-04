import { Router } from "express";
import { OrderController } from "./order.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
const router = Router();
// Only BUYER can place and view orders
router.use(protect, authorize("BUYER"));
router.post("/", OrderController.placeOrder);
router.get("/", OrderController.getMyOrders);
export default router;
