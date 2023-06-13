"use client";
import HomeHeroImage from "@/components/homeHeroImage/page";
import { Button } from "@mantine/core";
import { Prisma, PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

async function updateUserEmail(userId: number, newEmail: string) {

  const prisma = new PrismaClient();

  const updatedUser = await prisma.users.update({
    where: { id: userId },
    data: { email: newEmail },
  });

  console.log("Updated user:", updatedUser);
}

export default function Home() {
  const { status, data: session } = useSession();

  const handleUpdateEmail = () => {
    if (status === "authenticated") {
      updateUserEmail(109, "newEmail@example.com");
    } else {
      console.log("unauthenticated");
    }
  };



  return (
    <main>
      <Button onClick={handleUpdateEmail}>click to update user</Button>
      <HomeHeroImage />
    </main>
  );
}
