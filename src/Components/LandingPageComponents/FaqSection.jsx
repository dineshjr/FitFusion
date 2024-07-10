import {
  Accordion,
  AccordionItem,
  Box,
  AccordionButton,
  AccordionPanel,
  Container,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

const FaqSection = () => {
  return (
    <>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>FAQs</Heading>
          <Text>
            Find answers to common questions about our app and its features.
          </Text>
        </Stack>
      </Container>
      <Accordion allowMultiple style={{ margin: "0 auto", maxWidth: "1000px" }}>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    How does it work?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Our app allows you to choose workouts, track sets and reps, and
                progressively overload for better results.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Is it easy to use?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Yes, our app is designed to be user-friendly and intuitive,
                making it easy for anyone to get started.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Can I track my progress?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Absolutely! Our app allows you to track your progress over time,
                helping you stay motivated and see your improvements.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Is it suitable for beginners?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Yes, our app is perfect for beginners as it provides guidance
                and structure for your workouts, ensuring you start off on the
                right foot.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Can I customize my workouts?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Absolutely! Our app allows you to customize your workouts based
                on your preferences and fitness goals.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={5} align={"center"}>
          <Heading>Still have questions?</Heading>
          <Text>Contact us for more information.</Text>
          <Button>Contact Us</Button>
        </Stack>
      </Container>
    </>
  );
};

export default FaqSection;
