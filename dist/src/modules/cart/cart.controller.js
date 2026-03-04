import { CartService } from "./cart.service";
export class CartController {
    static async getCart(req, res) {
        const cart = await CartService.getCart(req.user.id);
        res.json(cart);
    }
    static async addToCart(req, res) {
        const { productId, quantity } = req.body;
        const item = await CartService.addToCart(req.user.id, productId, Number(quantity));
        res.status(201).json(item);
    }
    static async updateQuantity(req, res) {
        const { productId, quantity } = req.body;
        const item = await CartService.updateQuantity(req.user.id, productId, Number(quantity));
        res.json(item);
    }
    static async removeItem(req, res) {
        const { productId } = req.body;
        await CartService.removeItem(req.user.id, productId);
        res.json({ message: "Item removed successfully" });
    }
}
