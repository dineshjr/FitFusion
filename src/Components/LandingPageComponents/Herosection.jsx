import { Box, Heading, Text, Button } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <>
      <Box
        position="relative"
        width="100%"
        height={"100vh"} // Change to "100vh" for full viewport height on all devices
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          as="video"
          autoPlay
          loop
          muted
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          zIndex="-1"
        >
          <source src="/src/assets/Fitness_BG_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, 0.5)"
          zIndex="0"
        />
        <Box position="relative" textAlign="center" zIndex="1">
          <Heading as="h1" size="2xl" color="white">
            Start Your Fitness Journey Today
          </Heading>
          <Text fontSize="xl" color="white" mt={4}>
            Welcome to our FitFusion app, where you can choose workouts and
            track your progress with ease.
          </Text>
          <Button colorScheme="teal" size="lg" mt={6} mr={6}>
            Sign Up Now
          </Button>
          <Button colorScheme="whiteAlpha" size="lg" mt={6}>
            Know More
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HeroSection;
