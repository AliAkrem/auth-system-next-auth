'use client'
import React from "react";
import Loading from "../loading";
import { useSearchParams, useRouter } from "next/navigation";

export default function BadCredentialsPage() {
  const error = useSearchParams().get("error");

  const router = useRouter();

  if (error === "badLoginCredentials"){
    
  }
  else if (error === "badRegisterCredentials")
    router.push("/sign-up?error=badRegisterCredentials");
  else {
    router.push("/");
  }

  return <Loading />;
}
