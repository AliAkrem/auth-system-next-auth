"use client";

import RegisterForm from "@/components/register/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.replace("/");
  }

  return status === "unauthenticated" ? <RegisterForm /> : <Loading />;
}
