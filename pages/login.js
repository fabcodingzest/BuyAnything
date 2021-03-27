import baseUrl from "../helpers/baseUrl";
import ChakraInput from "../components/ChakraInput";
import { Button } from "@chakra-ui/button";
import { Container, Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is Required!"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Password is Required!"),
});

const Login = () => {
  const toast = useToast();
  const router = useRouter();
  const onSubmit = async ({ email, password }) => {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    const res2 = await res.json();
    console.log(res2);
    if (res2.error) {
      toast({
        description: res2.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      Cookies.set("token", res2.token, { expires: 7 });
      Cookies.set("user", res2.user, { expires: 7 });
      router.push("/account");
    }
  };
  return (
    <Container
      p={4}
      maxW="sm"
      border="1px"
      borderColor="gray.200"
      borderRadius="xl"
      mt={{ base: 50, md: 120 }}
    >
      <Text fontWeight="bold" fontSize="4xl" align="center">
        Login
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <ChakraInput name="email" label="Email" type="email" isRequired />
              <ChakraInput
                name="password"
                label="Password"
                type="password"
                isRequired
              />
              <Flex direction="column" align="center" py={4}>
                <Button type="submit" colorScheme="blue">
                  <Text>Login</Text>
                </Button>

                <Link backgroundColor="blue.300" href={`/signup`}>
                  <a>
                    <Text color="blue.500" p={4} fontWeight="bold">
                      Don't have an account?
                    </Text>
                  </a>
                </Link>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Login;
