import baseUrl from "../helpers/baseUrl";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Cart = ({ error, products }) => {
  const [cProducts, setCProducts] = useState(products);
  const { token } = parseCookies();
  const toast = useToast();
  const router = useRouter();
  let price = 0;
  const handleRemove = async (pid) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productId: pid }),
    });
    const res2 = await res.json();
    setCProducts(res2);
  };
  if (!token) {
    return (
      <Container
        align="center"
        // border="1px"
        // borderColor="gray.300"
        // borderRadius="lg"
        py={12}
      >
        <Text as="h3" fontSize="2xl" fontWeight="bold" pb={6}>
          Please Login to view your cart
        </Text>
        <Link href="/login">
          <a>
            <Button fontSize="md" px={6} py={2} colorScheme="blue">
              Login
            </Button>
          </a>
        </Link>
      </Container>
    );
  }
  if (error) {
    toast({
      description: error,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  }
  const CartItems = () => {
    return (
      <Container size="container.xl">
        {cProducts.map((item) => {
          price = price + item.quantity * item.product.price;
          return (
            <Flex align="center" my={6} key={item._id}>
              <Box w={{ base: "25%" }}>
                <Image src={item.product.mediaUrl} alt={item.product.name} />
              </Box>
              <Box ml={10}>
                <Text>{item.product.name}</Text>
                <Text>
                  {item.quantity} x ₹ {item.product.price}
                </Text>
                <Button
                  onClick={() => {
                    handleRemove(item.product._id);
                  }}
                  size="sm"
                  rightIcon={<FaTrash />}
                  colorScheme="red"
                >
                  <Text>Remove</Text>
                </Button>
              </Box>
            </Flex>
          );
        })}
      </Container>
    );
  };

  const handleCheckout = async (paymentInfo) => {
    const res = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ paymentInfo }),
    });
    const res2 = await res.json();
  };

  const TotalPrice = () => {
    return (
      <Container>
        <Flex align="center" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="medium">
            Total ₹ {price}
          </Text>
          {products.length !== 0 && (
            <StripeCheckout
              name="Buy Anything"
              amount={price * 100}
              image={products.length > 0 ? products[0].product.mediaUrl : ""}
              currency="INR"
              shippingAddress={true}
              billingAddress={true}
              zipCode={true}
              stripeKey="pk_test_51IYd4QSBJ5YiiAXoH28eW4QXBaAzfsXAagvRSKIKsrPrsgdOcYdV1I3GZSddXtyhykjvh4TvIvtSN7F0wKcOqLxS00PfVApB52"
              token={(paymentInfo) => handleCheckout(paymentInfo)}
            >
              <Button>Checkout</Button>
            </StripeCheckout>
          )}
        </Flex>
      </Container>
    );
  };
  return (
    <>
      <CartItems />
      <TotalPrice />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { props: { products: [] } };
  }
  const res = await fetch(`${baseUrl}/api/cart`, {
    headers: {
      Authorization: token,
    },
  });
  const products = await res.json();
  if (products.error) {
    return { props: { error: products.error } };
  }
  return { props: { products } };
}

export default Cart;
