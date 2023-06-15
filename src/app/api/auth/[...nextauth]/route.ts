import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as Yup from 'yup'
import { signInProvider } from "../providers/SignInProvider";
import { signUpProvider } from "../providers/signUpProvider";


const handler = NextAuth({

    providers: [
        signInProvider,
        signUpProvider,
    ]
    ,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, trigger }) {

            // set the new user data form database every update
            if (trigger === "update" && token) {
                const prisma = new PrismaClient();

                const getUser = await prisma.users.findUnique({ where: { id: Number(token.sub) } })

                if (getUser) {
                    token.name = getUser.userName
                    token.email = getUser.email
                }

            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },

})
export { handler as GET, handler as POST }