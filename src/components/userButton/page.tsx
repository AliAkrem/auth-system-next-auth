"use client";
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
} from "@mantine/core";
import { IconChevronRight, IconUsers } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  name?: string | null;
  email?: string | null;
}

export default function UserButton({
  image,
  name,
  email,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={220}
      withinPortal
      {...others}
    >
      <Menu.Target>
      <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

      
      </Group>

    </UnstyledButton>   
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item

          icon={<IconUsers size="1rem"  stroke={1.5} />}
          onClick={()=>{
            signOut()
          }}
        >
            <Text  size="xs" transform="uppercase" weight={700} color="dimmed">
              Sign Out
            </Text>
        </Menu.Item>
        
      </Menu.Dropdown>
    </Menu>
   
  );
}
