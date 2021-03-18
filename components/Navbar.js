import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import MenuToggle from "./MenuToggle";
import { useRouter } from "next/router";
function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const isActive = (route) => {
    if (router.pathname === route) return "active";
    return "";
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      bgGradient="linear(to-r, #7928CA,#FF0080,#FF0080)"
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} isActive={isActive} />
    </Flex>
  );
}

export default Navbar;
