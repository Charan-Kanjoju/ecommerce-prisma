import { Router } from "express";
import { CartController } from "./cart.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
const router = Router();
// Only BUYER can access cart
router.use(protect, authorize("BUYER"));
router.get("/", CartController.getCart);
router.post("/add", CartController.addToCart);
router.put("/update", CartController.updateQuantity);
router.delete("/remove", CartController.removeItem);
export default router;
