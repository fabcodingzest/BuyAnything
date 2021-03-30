import Link from "next/link";
import { Image } from "@chakra-ui/image";
import { Container, Flex, Text, Box } from "@chakra-ui/layout";
import baseUrl from "../helpers/baseUrl";

const Home = ({ products }) => {
  const productList = products.map((product) => {
    return (
      <Flex
        alignItems="stretch"
        borderRadius="lg"
        borderWidth="1px"
        m={4}
        key={product._id}
      >
        <Link href={`/product/${encodeURIComponent(product._id)}`}>
          <a>
            <Flex
              direction="column"
              maxW="xs"
              p={4}
              justifyContent="space-between"
              overflow="hidden"
              alignItems="stretch"
            >
              <Flex direction="column">
                <Image
                  src={product.mediaUrl}
                  alt={product.name}
                  objectFit="contain"
                  borderRadius="lg"
                  h="300px"
                  mx="auto"
                  fallbackSrc="https://via.placeholder.com/500"
                />
                <Box
                  mt="3"
                  fontWeight="semibold"
                  as="h2"
                  fontSize="large"
                  lineHeight="tight"
                  isTruncated
                  textTransform="uppercase"
                >
                  {product.name}
                </Box>
                <Box mt="2" as="h4" grow={1}>
                  <Text noOfLines={[2, 3, 4]}>{product.description}</Text>
                </Box>
              </Flex>
              <Box mt="2" as="h5">
                <Text fontWeight="bold">₹ {product.price}</Text>
              </Box>
            </Flex>
          </a>
        </Link>
      </Flex>
    );
  });
  return (
    <Container maxW="container.xl">
      <Text fontSize="2xl" fontWeight="bold">
        ALL PRODUCTS
      </Text>
      <Flex
        flexWrap="wrap"
        align="start"
        justifyContent="center"
        mt={10}
        h="100%"
        alignItems="stretch"
      >
        {productList}
      </Flex>
    </Container>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const products = await res.json();
  return {
    props: {
      products,
      fallback: true,
    },
    revalidate: 1,
  };
}

export default Home;
