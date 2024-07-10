import { Box, Button, Container, Heading, Input, Stack, Text } from "@chakra-ui/react";

const NewsletterForm = () => {
  return (
    <Box  color="black" py={20} bgImage={"/src/assets/chase-kinney-FMQBLyhD2HU-unsplash.jpg"}>
      <Container maxW="lg">
        <Stack spacing={8} textAlign="center" color={"white"}>
          <Heading as="h2" size="xl">
            Subscribe to our Newsletter
          </Heading>
          <Text fontSize="lg">
            Get the latest updates right in your inbox. Stay up to date with our latest news and offers.
          </Text>
          <Box as="form" mt={8}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Input
                type="email"
                placeholder="Enter your email"
                bg="white"
                color="black"
                border={0}
                _placeholder={{ color: "gray.500" }}
                required
              />
              <Button colorScheme="blue" bg="blue.600" type="submit">
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default NewsletterForm;
