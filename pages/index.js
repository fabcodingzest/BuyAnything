import Link from "next/link";
import { Image } from "@chakra-ui/image";
import { Container, Flex, Text, Box } from "@chakra-ui/layout";
import baseUrl from "../helpers/baseUrl";

const Home = ({ products }) => {
  const productList = products.map((product) => {
    return (
      <Flex p={4} borderRadius="lg" key={product._id}>
        <Link href={`/product/${encodeURIComponent(product._id)}`}>
          <a>
            <Flex
              direction="column"
              maxW="xs"
              p={3}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Flex direction="column" grow={1}>
                <Image
                  src={product.mediaUrl}
                  alt={product.name}
                  objectFit="cover"
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
      >
        {productList}
      </Flex>
    </Container>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
}

export default Home;
