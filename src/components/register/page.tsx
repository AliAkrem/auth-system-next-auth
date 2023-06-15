"use client";
import React, { startTransition, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// ? mantine component requirement _______________________________________
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Alert,
  Overlay,
} from "@mantine/core";
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(540),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
import {
  hasLength,
  isEmail,
  isNotEmpty,
  matchesField,
  useForm,
} from "@mantine/form";
import { combineValidators } from "@/validators/combineValidators";
import { isPasswordValid } from "@/validators/validSchema";
import { handleRegister } from "@/functions/handleRegister";
import { IconAlertCircle } from "@tabler/icons-react";
// ?______________________________________________________________________

export default function RegisterForm() {
  const { classes } = useStyles();

  // *________________ form context and validation shcema __________________________
  const registerForm = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirm: "",
    },
    validate: {
      userName: combineValidators(
        isNotEmpty("Please enter a value for this field"),
        hasLength({ min: 4, max: 10 }, "at least contain 4 characters")
      ),
      email: combineValidators(
        isNotEmpty("Please enter a value for this field."),
        isEmail("The email address you entered is invalid.")
      ),
      password: combineValidators(
        isPasswordValid(
          "Password should contain a combination of letters, numbers, and special characters."
        ),
        isNotEmpty("Please enter a value for this field.")
      ),
      confirm: matchesField("password", "Passwords are not the same"),
    },
  }); // * _________________________________________________________________________

  const router = useRouter();

  const [registerLoading, setRegisterLoading] = useState(false);

  const error = useSearchParams();

  const _handleRegister = () => {
    setRegisterLoading(true);
    handleRegister(registerForm.values, router, setRegisterLoading);
  };

  return (
    <>
      <div className={classes.wrapper}>
        {registerLoading && <Overlay opacity={0} />}
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
          
            sign up
          </Title>
          {error?.get("error") === "badRegisterCredentials" && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="bad credentials"
              color="red"
              mb="30px"
            >
              Sign up failed. Check the details you provided are correct.
            </Alert>
          )}
          <form onSubmit={registerForm.onSubmit(_handleRegister)}>
            <TextInput
              label="User Name"
              placeholder="Set user name"
              size="md"
              {...registerForm.getInputProps("userName")}
            />
            <TextInput
              label="Email address"
              placeholder="Your email"
              mt="md"
              size="md"
              {...registerForm.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...registerForm.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm"
              placeholder="Confirm password"
              mt="md"
              size="md"
              {...registerForm.getInputProps("confirm")}
            />
            <Button
              disabled={registerLoading}
              type="submit"
              variant="outline"
              fullWidth
              mt="xl"
              size="md"
            >
              Register
            </Button>
          </form>
          <Text ta="center" mt="md">
            have an account?
            <Button
              className="underline"
              variant="white"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          </Text>
        </Paper>
      </div>
    </>
  );
}
