import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field } from "formik";

const ChakraInput = ({ label, name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl
            isInvalid={form.errors[name] && form.touched[name]}
            py={4}
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input id={name} {...rest} {...field} />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default ChakraInput;
