import { Box, Text } from "@chakra-ui/layout";

const Footer = () => {
  return (
    <Box
      align="center"
      justify="center"
      wrap="wrap"
      w="100%"
      py={4}
      mt={6}
      backgroundColor="blue.500"
      color={["white", "white", "primary.700", "primary.700"]}
    >
      <Text>BuyAnything &copy; 2021 </Text>
      <Text>Made with Love by Fab</Text>
    </Box>
  );
};

export default Footer;
