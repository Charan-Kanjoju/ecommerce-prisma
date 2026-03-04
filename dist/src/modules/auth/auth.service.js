import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { generateToken } from "../../utils/jwt";
import prisma from "../../config/prisma";
export class AuthService {
    static async register(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        console.log("Registering user:", data);
        return prisma.user.create({
            data: {
                ...data,
                password: hashed,
                role: Role.buyer
            }
        });
    }
    static async login(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error("Invalid credentials");
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new Error("Invalid credentials");
        const token = generateToken({ id: user.id, role: user.role });
        return { token };
    }
}
