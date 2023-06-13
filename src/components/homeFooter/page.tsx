"use client";
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Text,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebookFilled,
  IconBrandFacebook,
  IconBrandGithub,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function HomeFooter() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text variant="gradient" gradient={{ from: "pink", to: "yellow" }}>
          Next-Auth
        </Text>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon
            size="lg"
            onClick={() => {
              window.open("https://twitter.com/Ali_Akrem_Barka", "_blank");
            }}
          >
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() => {
              window.open("https://www.facebook.com/barka.aliali.7/", "_blank");
            }}
          >
            <IconBrandFacebook size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() => {
              window.open("https://github.com/AliAkram7", "_blank");
            }}
          >
            <IconBrandGithub size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
