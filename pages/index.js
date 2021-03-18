import Link from "next/link";
import { Image } from "@chakra-ui/image";
import { Flex, Text, Box } from "@chakra-ui/layout";
import baseUrl from "../helpers/baseUrl";

const Home = ({ products }) => {
  const productList = products.map((product) => {
    return (
      <Box p={4} borderRadius="lg" key={product._id}>
        <Link href={`/product/${encodeURIComponent(product._id)}`}>
          <a>
            <Box
              maxW="xs"
              p={3}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src={product.mediaUrl}
                alt={product.name}
                objectFit="cover"
                borderRadius="lg"
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
              <Box mt="2" as="h4">
                <Text noOfLines={[2, 3, 4]}>{product.description}</Text>
              </Box>
              <Box mt="2" as="h5">
                <Text fontWeight="bold">{product.price}$</Text>
              </Box>
            </Box>
          </a>
        </Link>
      </Box>
    );
  });
  console.log(products);
  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      maxW="1400px"
      mt={10}
      mx="auto"
    >
      {productList}
    </Flex>
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
