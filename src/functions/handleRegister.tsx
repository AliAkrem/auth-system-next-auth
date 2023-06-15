import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export async function handleRegister(
  values: { email: string; password: string; userName: string },
  router: AppRouterInstance,
  setRegisterLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  notifications.show({
    id: "try_register",
    withCloseButton: false,
    title: "loading",
    autoClose : false, 
    message: "",
    style: { width: "30%" },
    loading: true,
  });

  await signIn("RegisterCredentials", {
    redirect: false,
    userName: values.userName,
    email: values.email,
    password: values.password,
    callbackUrl: "/",
  }).then((res) => {

    console.log(res)

    if (res?.error === "badRegisterCredentials"  || res?.error === "CredentialsSignin" ) {

      router.push("/sign-up?error=badRegisterCredentials");
      notifications.update({
        id: "try_register",
        withCloseButton: true,
        autoClose: 5000,
        title: "Error in register",
        icon: <IconX />,
        message: "bad credentials",
        style: { width: "60%" },
        loading: false,
      });
    } else {
      
      notifications.update({
        id: "try_register",
        withCloseButton: true,
        autoClose: 5000,
        title: "Welcome!",
        icon: <IconCheck />,
        message: "",
        style: { width: "60%" },
      });
    }
    setRegisterLoading(false);
  });
}
