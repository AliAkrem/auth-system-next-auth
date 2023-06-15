"use client";
import { Button, ButtonProps } from "@mantine/core";
import React from "react";

export default function MButton({ children ,...other  }: { children: React.ReactNode , other : ButtonProps  }) {
  return <Button {...other} >{children}</Button>;
}
