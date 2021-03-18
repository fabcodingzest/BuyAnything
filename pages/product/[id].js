import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import baseUrl from "../../helpers/baseUrl";

const Product = ({ product }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }
  return (
    <Flex
      p={10}
      maxW="1200px"
      mx="auto"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading
        align="center"
        as="h1"
        pb={14}
        size="2xl"
        textTransform={"uppercase"}
      >
        {product.name}
      </Heading>

      <Flex
        px={6}
        justifyContent="space-between"
        align="start"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          maxW={{ base: "300px", sm: "400px", md: "500px" }}
          w={{ base: "100%", md: "40%" }}
          align="center"
        >
          <Image src={product.mediaUrl} alt={product.name} />
        </Box>
        <Flex w={{ base: "100%", md: "50%" }} flexDirection="column">
          <Text py={6} fontSize={{ base: "md", md: "xl" }}>
            {product.description}
          </Text>
          <Text fontWeight="bold" fontSize={{ base: "2xl", md: "3xl" }}>
            ${product.price}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return { props: { product: data } };
}

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/api/products`);
  const products = await res.json();

  const paths = products.map((product) => ({ params: { id: product._id } }));
  return {
    paths,
    fallback: true,
  };
}

export default Product;
