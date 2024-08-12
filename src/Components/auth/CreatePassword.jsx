import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { updateUserPassword } from '../../redux/features/authThunk';
import { resetState } from '../../redux/features/authSlice';
import { useToast } from "@chakra-ui/react";


import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, FormErrorMessage } from '@chakra-ui/react';

const CreatePassword = () => {
  const { handleSubmit, register, watch, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();

  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.auth);
  const isLoadingRef = useRef(false);

  const onSubmit = async (values) => {
  // Replace with the actual user ID
    dispatch(updateUserPassword({ newPassword: values.newPassword }));
  };

  useEffect(() => {
    if (isLoading && !isLoadingRef.current) {
      isLoadingRef.current = true;
      toast({
        title: 'Loading...',
        description: 'Updating your password',
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (success) {
      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      dispatch(resetState()); // Reset state after success
      isLoadingRef.current = false; // Reset the ref
    }
  }, [success]);

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
      dispatch(resetState()); // Reset state after error
      isLoadingRef.current = false; // Reset the ref
    }
  }, [error]);


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
            Create New Password
          </Heading>
          <Text textAlign="center">
            Please enter your new password below.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="newPassword" isInvalid={errors.newPassword}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter new password"
                {...register('newPassword', {
                  required: 'New Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  maxLength: {
                    value: 15,
                    message: 'Password cannot exceed 15 characters'
                  },
                  pattern: {
                    value: /^(?=.*[!@#$%^&*])/,
                    message: 'Password must contain at least one special character'
                  }
                })}
              />
              <FormErrorMessage>
                {errors.newPassword && errors.newPassword.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="confirmPassword" isInvalid={errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm new password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === watch('newPassword') || 'Passwords do not match'
                })}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
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
              Set New Password
            </Button>

          </form>
        </VStack>
      </Box>
    </Box>
  );
}

export default CreatePassword;
