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
import { useState , useRef , useEffect} from "react";
import { useForm } from "react-hook-form";
import { auth, provider } from "../../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../redux/features/authThunk";
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const dispatch = useDispatch();
	const { isLoading, error, success,  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLoadingRef = useRef(false);
	const navigate = useNavigate();
  useEffect(() => {
		if (registerUser) {
			navigate('/dashboard')
		}
	}, [registerUser]);
  const onSubmit = async (values) => {
    dispatch(registerUser(values));
    if (isLoading && !isLoadingRef.current) {
      isLoadingRef.current = true;
      toast({
        title: 'Loading...',
        description: 'Processing your request',
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
    if (success) {
      toast({
        title: 'Success',
        description: 'Operation completed successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }

    if (error) {
      toast({
        title: 'An Error Occurred',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }

  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("User signed in:", result.user);
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
              boxShadow="3xl"
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
                <FormControl isInvalid={errors.firstName}>
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
                  <InputGroup mt="5">
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                      type="number"
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
                      name="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        maxLength: {
                          value: 16,
                          message: "Password must be no more than 16 characters",
                        },
                        pattern: {
                          value: /(?=.*[!@#$%^&*])/,
                          message: "Password must include at least one special character",
                        },
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
                      Existing user?{" "}
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
              boxShadow="2xl"
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

export default SignUpPage;


