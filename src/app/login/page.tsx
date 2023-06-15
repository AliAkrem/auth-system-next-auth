"use client";
import LoginForm from "@/components/loginForm/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    router.replace('/');
  }

  return (status === "unauthenticated" ? <LoginForm /> : <Loading />);


}
