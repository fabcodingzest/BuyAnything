import { Flex, Box } from "@chakra-ui/layout";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" justifyContent="space-between" minH="100vh">
      <Box>
        <Navbar />
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
