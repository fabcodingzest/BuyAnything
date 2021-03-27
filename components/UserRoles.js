import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import baseUrl from "../helpers/baseUrl";
import { Box, Text } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
function UserRoles() {
  const [users, setUsers] = useState([]);
  const { token } = parseCookies();
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const res = await fetch(`${baseUrl}/api/users`, {
      headers: {
        Authorization: token,
      },
    });
    const res2 = await res.json();
    setUsers(res2);
  };

  const handleRole = async (_id, role) => {
    const res = await fetch(`${baseUrl}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        _id,
        role,
      }),
    });
    const res2 = await res.json();
    const updateUsers = users.map((user) => {
      if (user.role !== res2.role && user.email === res2.email) {
        return res2;
      } else {
        return user;
      }
    });
    setUsers(updateUsers);
  };
  return (
    <Box my={10}>
      <Text as="h3" fontSize="2xl" fontWeight="bold">
        User Roles
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item) => {
            return (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td
                  cursor="pointer"
                  onClick={() => {
                    handleRole(item._id, item.role);
                  }}
                >
                  {item.role}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserRoles;
