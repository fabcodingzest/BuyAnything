import { parseCookies } from "nookies";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Container, Flex, Text } from "@chakra-ui/layout";
import ChakraInput from "../components/ChakraInput";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Image } from "@chakra-ui/image";
import baseURL from "../helpers/baseUrl";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(70, "Name should be 70 characters or less")
    .required("Name is Required!"),
  price: Yup.number()
    .integer("Must be a number!")
    .positive("Negative values can't be entered!")
    .min(1, "Price must be greater than zero!")
    .required("Price is required and it must be a number!"),
  description: Yup.string().required("Description cannot be empty!"),
});
const initialValues = {
  name: "",
  price: 0,
  mediaURL: "",
  description: "",
};
const imageUpload = async (mediaURL) => {
  const data = new FormData();
  data.append("file", mediaURL);
  data.append("upload_preset", "buyAnything");
  data.append("cloud_name", "fabriz");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/fabriz/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const res2 = await res.json();
  return res2.secure_url;
};

const onSubmit = async ({ name, price, description, media }, toast, router) => {
  const mediaUrl = await imageUpload(media);
  try {
    const res = await fetch(`${baseURL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        mediaUrl,
        description,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast({
        description: res2.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        description: "Product saved successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/product/${res2._id}`);
    }
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Create = () => {
  const toast = useToast();
  const router = useRouter();

  return (
    <Container
      p={4}
      maxW="container.md"
      border="1px"
      borderColor="gray.200"
      borderRadius="xl"
      mt={{ base: 50, md: 120 }}
    >
      <Text fontWeight="bold" fontSize="4xl" align="center">
        Add a Product
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values, toast, router);
        }}
      >
        {(formik) => {
          const handleFileUpload = (e) => {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onload = () => {
              if (reader.readyState === 2) {
                formik.setFieldValue("media", reader.result);
              }
            };
            reader.readAsDataURL(file);
          };
          return (
            <Form>
              <ChakraInput name="name" label="Name" type="text" isRequired />
              <ChakraInput
                name="price"
                label="Price"
                type="number"
                isRequired
              />
              <Field name="media">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={form.errors.media && form.touched.media}
                      py={4}
                    >
                      <FormLabel htmlFor="media">Photo</FormLabel>
                      <Input
                        p={1}
                        id="media"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                      <FormErrorMessage>{form.errors.media}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              {formik.values.media && (
                <Flex
                  direction="column"
                  justifyContent="center"
                  align="center"
                  border="1px"
                  borderRadius="lg"
                  borderColor="gray.200"
                  p={4}
                >
                  <Text fontSize="lg" fontWeight="medium" pb={2}>
                    Image Preview
                  </Text>
                  <Image
                    src={formik.values.media}
                    objectFit="cover"
                    maxH={300}
                  />
                </Flex>
              )}
              <ChakraInput
                name="description"
                label="Description"
                as="textarea"
                size="lg"
                placeholder="Description of the product"
                h={150}
                isRequired
              />
              <Flex justifyContent="center">
                <Button px={8} py={6} type="submit" colorScheme="blue">
                  Upload
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  if (user.role !== "admin") {
    const { res } = ctx;
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return { props: {} };
}

export default Create;
