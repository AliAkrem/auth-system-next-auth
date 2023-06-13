"use client";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { FormEvent, useTransition } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default async function handleLogin(
  values: {
    email: string;
    password: string;
  },
  status: "loading" | "authenticated" | "unauthenticated",
  router: AppRouterInstance
) {
  notifications.show({
    id: "try_login",
    withCloseButton: false,
    autoClose: 1000,
    title: "loading",
    message: "",
    style: { width: "30%" },
    loading: true,
  });

  await signIn("LoginCredentials", {
    redirect: false,
    email: values.email,
    password: values.password,
    callbackUrl: "/",
  }).then((res) => {
    if (res?.error === "badLoginCredentials") {
      router.push("/login?error=badLoginCredentials");
      notifications.update({
        id: "try_login",
        withCloseButton: true,
        autoClose: 5000,
        title: "Error in login",
        icon: <IconX />,
        message: "bad credentials",
        style: { width: "60%" },
        loading: false,
      });
      return;
    }

    notifications.update({
      id: "try_login",
      withCloseButton: true,
      autoClose: 5000,
      title: "Welcome back!",
      icon: <IconCheck />,
      message: "",
      style: { width: "60%" },
    });
    // router.replace('/')
  });
}
