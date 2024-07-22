import { useForm } from 'react-hook-form';
import { getFirestore, doc, updateDoc } from "firebase/firestore"; 


import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, FormErrorMessage } from '@chakra-ui/react';

const CreatePassword = () => {
  const { handleSubmit, register, watch, formState: { errors, isSubmitting } } = useForm();
  const db = getFirestore();

  const onSubmit = async (values) => {
    const userDocRef = doc(db, "users" , "IuC12PO7gtIrmrdHGT0d"); // Replace "userId" with the actual document ID
    const updatedData = {
      password:values.newPassword
    };
    updateDoc(userDocRef , updatedData )
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });

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
