import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import * as Yup from 'yup'
import { PrismaClient } from "@prisma/client"
export const signUpProvider = CredentialsProvider({

    name: 'RegisterCredentials',
    id: 'RegisterCredentials',
    credentials: {
        userName: { label: "user name", type: "text", placeholder: "user name" },
        email: { label: "email", type: "text", placeholder: "example@domain.com" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {



        const cred = {
            name: credentials.userName,
            email: credentials.email,
            password: credentials.password
        }


        if (!Yup.object().shape({
            name: Yup.string()
                .required()
                .max(255, 'email must be at most 255 characters'),
            email: Yup.string()
                .email('invalid email format')
                .required('email is required')
                .max(255, 'email must be at most 255 characters'),
            password: Yup.string().required('password is required')
                .min(8, 'password at least contain 8 character')
                .max(255, 'password must be at most 255 characters')
                .uppercase('must contain at least one uppercase')
        }).validate(cred)) {
            throw new Error('badRegisterCredentials');
        }


        const prisma = new PrismaClient()
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(cred.password, saltRounds).catch(() => { throw new Error('badRegisterCredentials'); });

        try {
            const user = await prisma.users.create({
                data: {
                    userName: cred.name,
                    email: cred.email,
                    password: hashed_password,
                    role: "USER"
                },
            }).catch(() => {
                console.log('error')
                throw new Error('badRegisterCredentials');

            })

            return {
                id: user.id,
                name: user.userName,
                email: user.email,
            }


        } catch (err) {

            throw new Error('badRegisterCredentials');

        }

    }
})