import { Box, Text } from "@chakra-ui/layout";
import Link from "next/link";

const Logo = () => {
  return (
    <Box px={{ base: 4, sm: 6 }}>
      <Link href="/">
        <a>
          <Text fontSize={{ base: "lg", md: "x-large" }} fontWeight="bold">
            BuyAnything
          </Text>
        </a>
      </Link>
    </Box>
  );
};

export default Logo;
