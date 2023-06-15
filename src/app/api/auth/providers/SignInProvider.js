import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
export const signInProvider = CredentialsProvider({
    name: 'credentials',
    id: 'LoginCredentials',
    credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
    },

    async authorize(credentials) {

        const prisma = new PrismaClient();

        const user = await prisma.users.findFirst({ where: { email: credentials?.email } });
        if (!user) {
            throw new Error('badLoginCredentials');
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('badLoginCredentials');
        }
        return {
            id: user.id,
            name: user.userName,
            email: user.email,
        };



    }
})