import { Request, Response } from "express";
import { CartService } from "./cart.service";

export class CartController {
  static async getCart(req: any, res: Response) {
    const cart = await CartService.getCart(req.user.id);
    res.json(cart);
  }

  static async addToCart(req: any, res: Response) {
    const { productId, quantity } = req.body;

    const item = await CartService.addToCart(
      req.user.id,
      productId,
      Number(quantity)
    );

    res.status(201).json(item);
  }

  static async updateQuantity(req: any, res: Response) {
    const { productId, quantity } = req.body;

    const item = await CartService.updateQuantity(
      req.user.id,
      productId,
      Number(quantity)
    );

    res.json(item);
  }

  static async removeItem(req: any, res: Response) {
    const { productId } = req.body;

    await CartService.removeItem(req.user.id, productId);

    res.json({ message: "Item removed successfully" });
  }
}