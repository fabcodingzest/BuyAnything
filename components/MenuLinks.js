import { Box, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";

const MenuItem = ({ children, isLast, to = "/", isActive, ...rest }) => {
  return (
    <Box
      bg={isActive(to) ? "rgba(75, 75, 75, 0.3)" : null}
      py={{ base: 2, sm: 6 }}
      px={{ base: 3, sm: 4 }}
      w="100%"
      align="center"
    >
      <Link href={to}>
        <a>
          <Text display="block" fontWeight="bold" {...rest}>
            {children}
          </Text>
        </a>
      </Link>
    </Box>
  );
};

const MenuLinks = ({ isOpen, isActive }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={6}
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
        w="100%"
      >
        <MenuItem to="/login" isActive={isActive}>
          Login
        </MenuItem>
        <MenuItem to="/signup" isActive={isActive}>
          SignUp
        </MenuItem>
        <MenuItem to="/create" isActive={isActive}>
          Create
        </MenuItem>
      </Stack>
    </Box>
  );
};

export default MenuLinks;
