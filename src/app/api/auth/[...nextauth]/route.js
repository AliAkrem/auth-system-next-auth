import NextAuth from "next-auth"
// import Providers from 'next-auth/providers';
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@next-auth/prisma-adapter";


const prisma = new PrismaClient();

const handler = NextAuth({

    providers: [
        CredentialsProvider({

            name: 'credentials',
            id: 'LoginCredentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                const prisma = new PrismaClient();

                const user = await prisma.users.findFirst({ where: { email: credentials.email } });
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
        }),
        CredentialsProvider({

            name: 'RegisterCredentials',
            id: 'RegisterCredentials',
            credentials: {
                userName: { label: "user name", type: "text", placeholder: "user name" },
                email: { label: "email", type: "text", placeholder: "example@domain.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const registerCredentials = {
                    registerCredentials:
                    {
                        userName: credentials.userName,
                        email: credentials.email,
                        password: credentials.password,
                    }
                }

                try {
                    const response = await fetch("http://localhost:3000/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(registerCredentials),
                    });
                    if (!response.ok) {
                        throw new Error('badRegisterCredentials');
                    }
                    const user = await response.json();
                    return {
                        id: user.id,
                        name: user.userName,
                        email: user.email,
                    };


                } catch (error) {
                    throw new Error('badRegisterCredentials');
                }
            },

        }),

    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    // adapter: PrismaAdapter(prisma),
    


})
export { handler as GET, handler as POST }