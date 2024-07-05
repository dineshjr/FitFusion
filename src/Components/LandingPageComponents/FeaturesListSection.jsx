/* eslint-disable react/prop-types */

import {
  Box,
  VStack,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Feature = ({ heading, text, icon }) => {
  return (
    <GridItem>
      {icon && icon}
      <chakra.h3 fontSize={{ base: "lg", md: "xl" }} fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

const GridListWithCTA = () => {
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h5 fontWeight="200" fontSize={{ base: "sm", md: "md" }}>
              Transform
            </chakra.h5>
            <chakra.h1 fontSize={{ base: "2xl", md: "4xl" }} fontWeight="700">
              Achieve Your Fitness Goals with Ease
            </chakra.h1>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p mt={10}>
              Our web app offers customizable workout plans, making it easy for
              you to tailor your fitness journey to your specific needs. With
              our intuitive tracking system, you can effortlessly keep track of
              your sets and reps, ensuring you stay on top of your progress.
              Plus, our progressive overload guidance will help you continuously
              challenge yourself and reach new heights in your fitness journey.
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{ base: 8, sm: 12, md: 16 }}
      >
        <Feature
          heading="Customizable Workout Plans"
          text="Tailor your fitness journey to your needs."
          icon={<ManageAccountsIcon/>}
        />
        <Feature
          heading="Easy Tracking of Sets and Reps"
          text="Effortlessly keep track of your progress."
          icon={<ShowChartIcon/>}
        />
        <Feature
          heading="Progressive Overload Guidance"
          text="Challenge yourself and reach new heights."
          icon={<FitnessCenterIcon />}
        />
      </Grid>
    </Box>
  );
};

export default GridListWithCTA;
