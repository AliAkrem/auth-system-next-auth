"use client";

import RegisterForm from "@/components/register/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";





export default function SignUpPage() {
  const router = useRouter();
  const session = useSession();

  if (session.data) {
    router.push("/");
  }

  return <RegisterForm />;
}
