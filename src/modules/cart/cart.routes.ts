import { Router } from "express";
import { CartController } from "./cart.controller";
import { protect} from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", protect,  CartController.getCart);

router.post("/add", protect, CartController.addToCart);

router.put("/update", protect, authorize("buyer"), CartController.updateQuantity);

router.delete("/remove", protect, authorize("buyer"), CartController.removeItem);

export default router;