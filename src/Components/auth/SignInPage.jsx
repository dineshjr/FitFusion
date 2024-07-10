import {
  SimpleGrid,
  Container,
  chakra,
  Input,
  Heading,
  Box,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
  Divider,
  Text,
  Image,
  Stack,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Link
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const SignInPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${values.email}`
      );
      if (response.data.length > 0) {
        console.log("user is already registered");
      } else {
        await axios.post("http://localhost:3001/users", values);
      }
    } catch (error) {
      console.error("Error checking or registering user:", error);
    }
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      result.user;
    });
  };

  return (
    <>
      <Box>
        <Container maxH="100%" maxW="100%">
          <SimpleGrid columns={{ base: 1, md: 2 }} p="10">
            <Box
              display={{ base: "block", md: "block" }}
              bg="white"
              height="100%"
              borderRadius="10px"
              p="10"
              border="none"
              boxShadow="3x1"
            >
              <Heading mb={6} textAlign="center">
                <span style={{ color: "#5850EC" }}>Fit</span>Fusion
              </Heading>

              <chakra.h3
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="600"
                textAlign="center"
              >
                Sign Up
              </chakra.h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.inputField}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Enter your firstname"
                    mt="5"
                    {...register("firstName", {
                      required: "Firstname is required",
                    })}
                  />
                  {errors.firstName && (
                    <FormErrorMessage>
                      {errors.firstName.message}
                    </FormErrorMessage>
                  )}

                  <Input
                    type="text"
                    placeholder="Enter your lastname"
                    name="lastName"
                    mt="5"
                    {...register("lastName", {
                      required: "Lastname is required",
                    })}
                  />
                  {errors.lastName && (
                    <FormErrorMessage>
                      {errors.lastName.message}
                    </FormErrorMessage>
                  )}
                  <Input
                    type="email"
                    placeholder="Enter your emailid"
                    name="emailID"
                    mt="5"
                    {...register("emailID", {
                      required: "Emailid is required",
                    })}
                  />
                  {errors.emailID && (
                    <FormErrorMessage>
                      {errors.emailID.message}
                    </FormErrorMessage>
                  )}
                  <InputGroup mt="5">
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                      type="tel"
                      placeholder="Enter your mobile number"
                      name="phoneNumber"
                      border="1px solid black"
                      {...register("phoneNumber", {
                        required: "Mobile number is required",
                      })}
                    />
                  </InputGroup>
                  {errors.phoneNumber && (
                    <FormErrorMessage>
                      {errors.phoneNumber.message}
                    </FormErrorMessage>
                  )}
                  <InputGroup size="md" mt="5">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Create your password"
                      border="1px solid black"
                      name="passWord"
                      {...register("inputField", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        maxLength: {
                          value: 16,
                          message:
                            "Password must be no more than 16 characters",
                        },
                        pattern: {
                          value: /(?=.*[!@#$%^&*])/,
                          message:
                            "Password must include at least one special character",
                        },
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.inputField && (
                    <FormErrorMessage>
                      {errors.inputField.message}
                    </FormErrorMessage>
                  )}
                  <Button colorScheme="blue" w="100%" type="submit" mt="5">
                    Continue with email
                  </Button>
                  <Stack spacing={4} pt={4}>
                    <Box position="relative" textAlign="center" width="100%">
                      <Divider />
                      <Text
                        as="span"
                        position="absolute"
                        top="-10px"
                        left="50%"
                        transform="translateX(-50%)"
                        bg={useColorModeValue("white", "gray.700")}
                        px={2}
                        color="gray.500"
                        fontSize="sm"
                      >
                        OR
                      </Text>
                    </Box>

                    <Button
                      leftIcon={
                        <Image
                          boxSize="30px"
                          src="/src/assets/logo_google_g_icon.svg"
                          alt="Google logo"
                        />
                      }
                      colorScheme="gray"
                      variant="outline"
                      onClick={handleSignIn}
                      mt="5"
                    >
                      Continue with Google
                    </Button>
                    <Text>
                      Existing user means?{" "}
                      <Link color="teal.500" href="#">
                       Click here to sign in
                      </Link>
                    </Text>
                  </Stack>
                </FormControl>
              </form>
            </Box>
            <Box
              display={{ base: "none", md: "block" }}
              bg="white"
              height="100%"
              borderRadius="10px"
              p="0"
              border="none"
              boxShadow="2x1"
            >
              <Image
                src="/src/assets/pexels-pixabay-260352.jpg"
                alt="Sign Up Illustration"
                borderRadius="10px"
                objectFit="cover"
                height="100%"
                width="100%"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default SignInPage;
