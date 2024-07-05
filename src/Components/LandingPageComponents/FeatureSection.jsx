import { Box, Heading, Text, HStack, Image, Flex } from "@chakra-ui/react";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const FeatureSection = () => {
  return (
    <Box p={8}>
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4}>
            Discover Personalized Workouts, Track Progress, and Get Community Support
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
            Our app offers personalized workouts tailored to your fitness goals. Track your progress and stay motivated with our community support.
          </Text>
          <HStack spacing={8} mt={8} justifyContent={{ base: "center", md: "flex-start" }}>
            <Box textAlign={{ base: "center", md: "left" }}>
              <FitnessCenter fontSize="large" />
              <Heading as="h3" size={{ base: "sm", md: "md" }} mt={2}>
                Personalized
              </Heading>
              <Text>
                Choose from a wide variety of workouts designed specifically for your needs.
              </Text>
            </Box>
            <Box textAlign={{ base: "center", md: "left" }}>
              <HourglassTopIcon fontSize="large" />
              <Heading as="h3" size={{ base: "sm", md: "md" }} mt={2}>
                Progress
              </Heading>
              <Text>
                Track your progress and see how far you have come on your fitness journey.
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box flex="1" ml={{ md: 8 }} mt={{ base: 8, md: 0 }} textAlign="center">
          <Image
            src="/src/assets/Fitness-transformed.png"
            alt="Feature image"
            borderRadius="md"
            boxShadow="lg"
            maxW={{ base: "100%", md: "80%" }}
            mx="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default FeatureSection;
