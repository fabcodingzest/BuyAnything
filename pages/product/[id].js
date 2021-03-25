import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text, Box, Flex, Heading } from "@chakra-ui/layout";
import {
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  toast,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { useState } from "react";
import baseUrl from "../../helpers/baseUrl";

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const cookie = parseCookies();
  const toast = useToast();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    await res.json();
    router.push("/");
  };
  const AddToCart = async () => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({ quantity, productId: product._id }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast({
        description: res2.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      Cookies.remove("token");
      Cookies.remove("user");
      router.push("/login");
    }
    toast({
      description: res2.message,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Flex
      p={{ base: 4, md: 10 }}
      maxW="1200px"
      mx="auto"
      justifyContent="center"
      flexDirection="column"
      border="1px"
      m={{ base: 2, md: 4 }}
      borderRadius="lg"
      borderColor="gray.300"
    >
      <Heading
        align="center"
        as="h1"
        py={{ base: 6 }}
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
          mb={{ base: 6, md: 0 }}
          maxW={{ base: "300px", sm: "400px", md: "500px" }}
          w={{ base: "100%", md: "40%" }}
          align="center"
          mx="auto"
        >
          <Image src={product.mediaUrl} alt={product.name} borderRadius="lg" />
        </Box>
        <Flex w={{ base: "100%", md: "50%" }} flexDirection="column">
          <Text fontWeight="bold" fontSize={{ base: "md", md: "xl" }}>
            Product Description lorem40
          </Text>
          <Text py={4} fontSize={{ base: "md", md: "xl" }}>
            {product.description}
          </Text>
          <Flex align="center" justifyContent={"space-between"} mb={2}>
            <Flex maxW={100}>
              <NumberInput
                defaultValue={quantity}
                min={1}
                max={100}
                onChange={setQuantity}
              >
                <NumberInputField h={12} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Text fontWeight="bold" fontSize={{ base: "2xl", md: "3xl" }}>
              ₹ {product.price}
            </Text>
          </Flex>
          <Flex
            w={{ base: "60%", md: "100%" }}
            mx="auto"
            justifyContent={{ base: "space-around", md: "space-between" }}
          >
            {user ? (
              <Button
                onClick={() => AddToCart()}
                my={4}
                mr={3}
                px={10}
                maxW={40}
                colorScheme="blue"
              >
                Add
              </Button>
            ) : (
              <Button
                onClick={() => {
                  router.push("/login");
                }}
                my={4}
                mr={3}
                px={10}
                maxW={40}
                colorScheme="blue"
              >
                Login to Add
              </Button>
            )}
            {user.role === "admin" && user.role === "root" && (
              <Button
                onClick={onOpen}
                my={4}
                px={8}
                maxW={40}
                colorScheme="red"
              >
                Delete
              </Button>
            )}
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent my="auto">
              <ModalHeader textTransform="uppercase">
                {product.name}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to delete this product?
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="red" onClick={() => deleteProduct()}>
                  Yes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
