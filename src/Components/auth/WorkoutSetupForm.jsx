// src/components/StepperForm.js
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, Select, Stack, Text, HStack, Divider, Grid, GridItem, Progress, Card, CardHeader, CardBody, CardFooter, VStack, useDisclosure } from '@chakra-ui/react';

const steps = [
  { id: 1, label: 'Goal', options: ['Maintain', 'Bulk', 'Cutting'] },
  { id: 2, label: 'Current Level', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { id: 3, label: 'Gender', options: ['Male', 'Female', 'Other'] },
  { id: 4, label: 'Age, Height & Weight', options: [] }, // Special case, needs input fields
  { id: 5, label: 'Workout Frequency', options: [] }, // Special case, needs input fields
  { id: 6, label: 'Workout Type', options: ['Gym', 'Home'] }
];

const StepperForm = () => {
  const { control, handleSubmit, register, formState: { errors }, setValue } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Calculate completion percentage based on the current step
  const completionPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleCardClick = (stepId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [stepId]: option }));
    nextStep();
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <Box p={6} maxW="md" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Stack spacing={6} mb={6}>
        {/* Progress Bar */}
        <Stack spacing={2}>
          <Text fontSize="lg" fontWeight="bold">Completion: {Math.round(completionPercentage)}%</Text>
          <Progress value={completionPercentage} size="sm" colorScheme="teal" />
        </Stack>

        {/* Step Indicators */}
        <HStack spacing={4}>
          {steps.map((step) => (
            <Box
              key={step.id}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              bg={currentStep === step.id ? 'teal.200' : 'gray.100'}
              color={currentStep === step.id ? 'teal.800' : 'gray.600'}
              textAlign="center"
              flex={1}
            >
              {step.label}
            </Box>
          ))}
        </HStack>
        <Divider />
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          {/* Dynamic Content Based on Current Step */}
          {steps[currentStep - 1].options.length > 0 ? (
            // Display Cards for Options
            <Stack spacing={4}>
              {steps[currentStep - 1].options.map((option) => (
                <Card
                  key={option}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  cursor="pointer"
                  bg={selectedOptions[currentStep] === option ? 'teal.100' : 'gray.50'}
                  onClick={() => handleCardClick(steps[currentStep - 1].id, option)}
                >
                  <CardHeader>
                    <Text fontWeight="bold" fontSize="lg">{option}</Text>
                  </CardHeader>
                  <CardBody>
                    {/* Add description or additional info if needed */}
                  </CardBody>
                </Card>
              ))}
            </Stack>
          ) : (
            // Display Input Fields
            currentStep === 4 && (
              <Box p={4} borderWidth="1px" borderRadius="md">
                <Grid templateColumns="1fr 1fr" gap={4}>
                  <GridItem>
                    <FormControl isInvalid={errors.age}>
                      <FormLabel>Age</FormLabel>
                      <Input {...register('age', { required: true })} type="number" placeholder="Enter age" />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isInvalid={errors.height}>
                      <FormLabel>Height (cm)</FormLabel>
                      <Input {...register('height', { required: true })} type="number" placeholder="Enter height" />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl isInvalid={errors.weight}>
                      <FormLabel>Weight (kg)</FormLabel>
                      <Input {...register('weight', { required: true })} type="number" placeholder="Enter weight" />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>
            )
          )}
          {currentStep === 5 && (
            <Box p={4} borderWidth="1px" borderRadius="md">
              <FormControl isInvalid={errors.workoutFrequency}>
                <FormLabel>Workout Frequency (times per week)</FormLabel>
                <Input {...register('workoutFrequency', { required: true })} type="number" placeholder="Enter frequency" />
              </FormControl>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Stack direction="row" spacing={4} mt={6} justify="space-between">
            <Button onClick={prevStep} isDisabled={currentStep === 1} colorScheme="teal">
              Back
            </Button>
            <Button onClick={nextStep} isDisabled={currentStep === steps.length} colorScheme="teal">
              Next
            </Button>
            {currentStep === steps.length && (
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default StepperForm;
