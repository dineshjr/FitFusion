import { useForm } from 'react-hook-form';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, FormErrorMessage } from '@chakra-ui/react';
import emailjs from '@emailjs/browser';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const ForgotPassword = () => {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();

  const [linksDisabled, setLinkDisabled] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('resetId');
    if (storedData) {
      const { timestamp } = JSON.parse(storedData);
      const currentTime = new Date().getTime();
      const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;

      if (currentTime - timestamp >= twoHoursInMilliseconds) {
        setLinkDisabled(true);
      }

      const checkTime = () => {
        const currentTime = new Date().getTime();
        if (currentTime - timestamp >= twoHoursInMilliseconds) {
          setLinkDisabled(true);
        }
      };

      const interval = setInterval(checkTime, 1000);

      return () => clearInterval(interval);
    }
  }, []);



  const onSubmit = async (values) => {
    const resetId = uuidv4();

    const templateParams = {
      resetLink: `http://localhost:5173/createpassword/${resetId}`
    };
    // Add your form submission logic here
    const userQuery = query(
      collection(db, "users"),
      where("emailid", "==", values.emailid)
    );
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      console.log("Password Reset link has been sent please check ur email");
      console.log(linksDisabled , "this link has been disabled after 2 hrs");
      emailjs.send('service_j10u2dk', 'template_zswuftp', templateParams, '27tcg4v4_jVSFKYqS')
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text, templateParams);
        }, (error) => {
          console.error('Failed to send email:', error);
        });
      const params = {
        resetId: resetId,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem('resetId', JSON.stringify(params));
    } else {


      console.log("Please enter the registered email id");
    }

  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        w="full"
        maxW="md"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        bg="white"
        boxShadow="lg"
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg" textAlign="center">
            Forgot Password
          </Heading>
          <Text textAlign="center">
            Enter your email address and we will send you a link to reset your password.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" isInvalid={errors.emailid}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register('emailid', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address'
                  }
                })}
              />
              <FormErrorMessage>
                {errors.emailid && errors.emailid.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              mt={4}
              w="full"
              isLoading={isSubmitting}
            >
              Send Reset Link
            </Button>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
