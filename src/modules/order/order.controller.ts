import { Response } from "express";
import { OrderService } from "./order.service";

export class OrderController {
  static async placeOrder(req: any, res: Response) {
    const order = await OrderService.placeOrder(req.user.id);
    res.status(201).json(order);
  }

  static async getMyOrders(req: any, res: Response) {
    const orders = await OrderService.getMyOrders(req.user.id);
    res.json(orders);
  }
}