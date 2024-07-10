/* eslint-disable react/prop-types */
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
    IoFitness,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";

const Feature = ({ text, icon, iconBg }) => (
  <Stack direction="row" align="center">
    <Flex
      w={8}
      h={8}
      align="center"
      justify="center"
      rounded="full"
      bg={iconBg}
    >
      {icon}
    </Flex>
    <Text fontWeight={600}>{text}</Text>
  </Stack>
);

const SplitWithImage = () => (
  <Container maxW="5xl" py={12}>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <Stack spacing={4}>
        <Text
          textTransform="uppercase"
          color="blue.400"
          fontWeight={600}
          fontSize="sm"
          bg={useColorModeValue("blue.50", "blue.900")}
          p={2}
          alignSelf="flex-start"
          rounded="md"
        >
          Get Fit
        </Text>
        <Heading>Achieve Your Fitness Goals Faster with Our App</Heading>
        <Text color="gray.500" fontSize="lg">
          Our app is designed to help you achieve your fitness goals faster,
          stay motivated, and have a structured plan. With a wide range of
          workouts to choose from and the ability to track your sets and reps,
          you can easily incorporate progressive overload into your training
          routine.
        </Text>
        <Stack
          spacing={4}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.100", "gray.700")}
            />
          }
        >
          <Feature
            icon={<Icon as={IoFitness} color="yellow.500" w={5} h={5} />}
            iconBg={useColorModeValue("yellow.100", "yellow.900")}
            text="Choose from a Variety of Workouts"
          />
          <Feature
            icon={<Icon as={IoLogoBitcoin} color="green.500" w={5} h={5} />}
            iconBg={useColorModeValue("green.100", "green.900")}
            text="Track Your Sets and Reps"
          />
          <Feature
            icon={<Icon as={IoSearchSharp} color="purple.500" w={5} h={5} />}
            iconBg={useColorModeValue("purple.100", "purple.900")}
            text="Incorporate Progressive Overload for Better Results"
          />
        </Stack>
      </Stack>
      <Flex>
        <Image
          rounded="md"
          alt="feature image"
          src="https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          objectFit="cover"
        />
      </Flex>
    </SimpleGrid>
  </Container>
);

export default SplitWithImage;
