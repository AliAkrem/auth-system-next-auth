import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export async function handleRegister(
  values: { email: string; password: string; userName: string }
  //   event: FormEvent<HTMLFormElement>
) {
  //   event.preventDefault();
  const result = await signIn("RegisterCredentials", {
    userName: values.userName,
    email: values.email,
    password: values.password,
    callbackUrl: "/",
  })
    .then((res) => {

      console.log(res?.error);
    })
    .catch((err) => {});
}
