/* eslint-disable react/no-unescaped-entities */
import {
  SimpleGrid,
  Container,
  chakra,
  Input,
  Heading,
  Box,
  InputGroup,
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
import { auth, provider } from "../../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { useToast } from "@chakra-ui/react";


const SignInPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("emailid", "==", values.emailid, "password", "==", values.password)
      );

      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        toast({
          title: "Sign In Successful",
          description: "You have successfully signed in.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      } else {
        toast({
          title: "Sign In Failed",
          description: "Please check your user credentials.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }


    } catch (error) {
      toast({
        title: "An Error Occurred",
        description: "There was an error while signing in. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
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
                Welcome Back
              </chakra.h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.password}>
                  <Input
                    type="email"
                    placeholder="Enter your registered emailid"
                    name="emailid"
                    mt="5"
                    {...register("emailid", {
                      required: "Emailid is required",
                    })}
                  />
                  {errors.emailid && (
                    <FormErrorMessage>
                      {errors.emailid.message}
                    </FormErrorMessage>
                  )}

                  <InputGroup size="md" mt="5">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Create your password"
                      border="1px solid black"
                      name="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
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
                      Don't have an account?{" "}
                      <Link color="teal.500" href="#">
                        Click here to sign up
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
