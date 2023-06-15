"use client";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { useLocalStorage } from "@mantine/hooks";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  // const [colorScheme, setColorScheme] = useState<string | true>("light");

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });


  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  useEffect(() => {
    setLoading(false);
  }, []);

  return isLoading == true ? (
    <Loading/>
  ) : (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: colorScheme,
            primaryColor: "blue",
            loader: "dots",
          }}
        >
          <Notifications position="bottom-left" />
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}
