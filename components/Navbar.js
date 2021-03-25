import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import MenuToggle from "./MenuToggle";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

function Navbar(props) {
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isActive = (route) => {
    if (router.pathname === route) return "active";
    return "";
  };

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      backgroundColor="blue.500"
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      <Logo close={close} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks
        isOpen={isOpen}
        isActive={isActive}
        toggle={toggle}
        user={user}
      />
    </Flex>
  );
}

export default Navbar;
