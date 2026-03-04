import { AuthService } from "./auth.service";
export class AuthController {
    static async register(req, res, next) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body.email, req.body.password);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
