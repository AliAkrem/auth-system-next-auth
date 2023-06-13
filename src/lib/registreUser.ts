import { NextResponse } from "next/server";

export async function RegisterUser(credentials: registerCredentials) {


    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            return NextResponse.json({ message: "there are an error" })
            
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error making POST request:", error);
        throw error;
    }



}