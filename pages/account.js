import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Flex, Box } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import { parseCookies } from "nookies";
import { IoIosArrowDown } from "react-icons/io";
import baseUrl from "../helpers/baseUrl";

const Account = ({ orders }) => {
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const OrderHistory = () => {
    const { isOpen, onToggle } = useDisclosure();
    return (
      <Container>
        {orders.map(item => {
          return (
            <Flex justifyContent="space-between">
              <Collapse in={isOpen}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
                ad.
              </Collapse>
              <Button size="xs" onClick={onToggle}>
                <Icon as={IoIosArrowDown} />
              </Button>
            </Flex>
          );
        })}
      </Container>
    );
  };
  return (
    <Container>
      <Flex>Hello</Flex>
      <Box>
        <OrderHistory />
      </Box>
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
  console.log(res2);

  return { props: { orders: res2 } };
}

export default Account;
