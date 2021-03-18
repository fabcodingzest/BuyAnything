import { Box } from "@chakra-ui/layout";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const MenuToggle = ({ isOpen, toggle }) => {
  return (
    <Box
      p={{ base: 4, sm: 6 }}
      display={{ base: "block", md: "none" }}
      onClick={toggle}
    >
      {isOpen ? <CloseIcon fontSize="20" /> : <HamburgerIcon fontSize="25" />}
    </Box>
  );
};

export default MenuToggle;
