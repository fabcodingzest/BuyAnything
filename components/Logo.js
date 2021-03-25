import { Box, Text } from "@chakra-ui/layout";
import Link from "next/link";

const Logo = ({ close }) => {
  return (
    <Box px={{ base: 4, sm: 6 }} onClick={close}>
      <Link href="/">
        <a>
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            BuyAnything
          </Text>
        </a>
      </Link>
    </Box>
  );
};

export default Logo;
