"use client";
import HomeHeroImage from "@/components/homeHeroImage/page";
import { Button } from "@mantine/core";
import { Prisma, PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session, update } = useSession();

  return (
    <main>
      <HomeHeroImage />
    </main>
  );
}
