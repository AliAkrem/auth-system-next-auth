import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt';
import { RegisterRequest } from '@/Requests/RequestRules/registerRequestRules';



export async function POST(request: Request) {
    // Create user, posts, and categories
    const prisma = new PrismaClient()


    const req = new RegisterRequest(request);


    const { registerCredentials: { userName, password, email } }: registerCredentials = await req.json()


    if (!req.authorize()) {

        return null;

    }

    try {
        await req.rules().validate({ userName, password, email });
    } catch (error: any) {
        return null
    }

    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
    try {
        const user = await prisma.users.create({
            data: {
                email: email,
                userName: userName,
                password: hashed_password,
                role: "USER"
            },
        })

        if (user) {
            return NextResponse.json({ id: user.id, email: user.email, name: user.userName });
        }

        return null


    } catch (error) {
        return null;
    }


}
