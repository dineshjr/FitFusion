import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useToast } from "@chakra-ui/react";


import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetEmail  } from '../../redux/features/authThunk';
import { resetState } from '../../redux/features/authSlice';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, FormErrorMessage } from '@chakra-ui/react';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
  const { isLoading, error, resetLinkSent } = useSelector((state) => state.auth);
  const isLoadingRef = useRef(false);





  const onSubmit = async (values) => {
    dispatch(sendPasswordResetEmail(values));

  };

  useEffect(() => {
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
  }, [isLoading, toast, dispatch]); // Added dispatch to the dependency array

  useEffect(() => {
    if (resetLinkSent) {
      toast({
        title: 'Password Reset Link Sent',
        description: 'Please check your email for the reset link.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      dispatch(resetState());
      isLoadingRef.current = false;
    }
  }, [resetLinkSent, toast, dispatch]); // Added dispatch to the dependency array

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      dispatch(resetState());
      isLoadingRef.current = false;
    }
  }, [error, toast, dispatch]); // Added dispatch to the dependency array


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