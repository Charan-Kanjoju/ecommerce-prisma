import { OrderService } from "./order.service";
export class OrderController {
    static async placeOrder(req, res) {
        const order = await OrderService.placeOrder(req.user.id);
        res.status(201).json(order);
    }
    static async getMyOrders(req, res) {
        const orders = await OrderService.getMyOrders(req.user.id);
        res.json(orders);
    }
}
