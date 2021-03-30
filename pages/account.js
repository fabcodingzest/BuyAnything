import baseUrl from "../helpers/baseUrl";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Flex, Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import { parseCookies } from "nookies";
import { IoIosArrowDown } from "react-icons/io";
import { MdBorderColor } from "react-icons/md";
import UserRoles from "../components/UserRoles";

const Account = ({ orders }) => {
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const OrderItem = ({ item }) => {
    const { isOpen, onToggle } = useDisclosure();
    return (
      <Flex
        justifyContent="space-between"
        direction="column"
        key={item._id}
        border="1px"
        p={4}
        borderRadius="lg"
        borderColor="gray.300"
      >
        <Flex justifyContent="space-between" width="100%">
          <Text isTruncated>
            <Icon as={MdBorderColor} boxSize={{ sm: 6 }} mr={4} />
            {item.createdAt}
          </Text>
          <Button size="xs" onClick={onToggle}>
            <Icon as={IoIosArrowDown} />
          </Button>
        </Flex>
        <Collapse in={isOpen}>
          <Box my={4} backgroundColor="gray.300" p={4} borderRadius="lg">
            <Flex justifyContent="space-between" width="100%">
              <Text fontWeight="bold">Items</Text>
              <Text fontWeight="bold">Price</Text>
            </Flex>
            {item.products.map((pItem) => {
              return (
                <Flex
                  justifyContent="space-between"
                  width="100%"
                  key={pItem._id}
                >
                  <Text as="h5" key={pItem._id} fontWeight="medium">
                    {pItem.product.name} X {pItem.quantity}
                  </Text>
                  <Text fontWeight="medium">{pItem.product.price}</Text>
                </Flex>
              );
            })}
            <Text as="h5" align="end" fontSize="md" fontWeight="bold" mt={2}>
              Total ₹ {item.total}
            </Text>
          </Box>
        </Collapse>
      </Flex>
    );
  };
  const OrderHistory = () => {
    return (
      <Box>
        {orders.map((item) => {
          return <OrderItem item={item} />;
        })}
      </Box>
    );
  };
  return (
    <Container maxW="container.lg" h="100%">
      <Flex direction="column" justifyContent="start">
        <Flex
          p={10}
          direction="column"
          backgroundColor="blue.500"
          color="white"
          align="center"
          mb={6}
        >
          <Text as="h1" fontSize="3xl" fontWeight="bold">
            Account Details
          </Text>
          <Text py={4} fontSize="xl">
            Name: {user.name}
          </Text>
          <Text fontSize="xl">Email: {user.email}</Text>
        </Flex>
        <Text as="h2">Order History</Text>
        {orders.length === 0 ? (
          <Container>
            <Text as="h3" fontSize="2xl">
              You have no order History
            </Text>
          </Container>
        ) : (
          <Box>
            <OrderHistory />
          </Box>
        )}
        {user.role === "root" && <UserRoles />}
      </Flex>
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  const res = await fetch(`${baseUrl}/api/orders`, {
    headers: { Authorization: token },
  });
  const res2 = await res.json();

  return {
    props: { orders: res2 },
  };
}

export default Account;
