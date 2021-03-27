import { Button } from "@chakra-ui/button";
import { Box, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import { ImCart } from "react-icons/im";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const MenuItem = ({
  children,
  isLast,
  toggle,
  to = "/",
  isActive,
  ...rest
}) => {
  return (
    <Link href={to}>
      <a style={{ width: "100%" }}>
        <Box
          onClick={toggle}
          bg={isActive(to) ? "rgba(75, 75, 75, 0.3)" : null}
          py={{ base: 2, sm: 6 }}
          px={{ base: 3, sm: 4 }}
          w="100%"
          align="center"
        >
          <Text display="block" fontWeight="bold" {...rest}>
            {children}
          </Text>
        </Box>
      </a>
    </Link>
  );
};

const MenuLinks = ({ isOpen, isActive, toggle, user }) => {
  const router = useRouter();
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
        pb={{ base: 4, md: 0 }}
      >
        <MenuItem to="/cart" isActive={isActive} toggle={toggle}>
          <Icon w={6} h={6} as={ImCart} />
        </MenuItem>
        {(user.role === "admin" || user.role === "root") && (
          <MenuItem to="/create" isActive={isActive} toggle={toggle}>
            Create
          </MenuItem>
        )}
        {user ? (
          <>
            <MenuItem to="/account" isActive={isActive} toggle={toggle}>
              Account
            </MenuItem>
            <Button
              mr={{ md: 6 }}
              py={{ base: 2, sm: 6 }}
              px={{ base: 3, sm: 4 }}
              w={{ md: "100%" }}
              onClick={() => {
                toggle();
                Cookies.remove("token");
                Cookies.remove("user");
                router.push("/login");
              }}
              _hover={{
                border: "1px",
                borderColor: "white",
                backgroundColor: "white",
                color: "blue.500",
              }}
              variant="outline"
              colorScheme="white"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <MenuItem to="/login" isActive={isActive} toggle={toggle}>
              Login
            </MenuItem>
            <MenuItem to="/signup" isActive={isActive} toggle={toggle}>
              SignUp
            </MenuItem>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
