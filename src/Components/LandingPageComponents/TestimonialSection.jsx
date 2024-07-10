import { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Avatar,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

const CaptionCarousel = () => {
  const [slider, setSlider] = useState(null);

  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const cards = [
    {
      userName: 'John Doe',
      userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      title: 'FitFusion',
      description:
        "I have been using the app for a few months now and I am amazed by the results. It has helped me achieve my fitness goals faster than ever before.",
    },
    {
      userName: 'Jane Smith',
      userImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      title: 'FitFusion',
      description:
        "I have been using the app for a few months now and I am amazed by the results. It has helped me achieve my fitness goals faster than ever before.",
    },
    {
      userName: 'Mike Johnson',
      userImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      title: 'FitFusion',
      description:
        "I have been using the app for a few months now and I am amazed by the results. It has helped me achieve my fitness goals faster than ever before.",
    },
  ];

  return (
    <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={'600px'}
            position="relative"
          >
            <Container maxW="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={'full'}
                
                h="100%"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Avatar src={card.userImage} size="xl" />
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
                  {card.description}
                </Text>
                <Text fontSize="sm" color="GrayText">
                  {card.userName}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CaptionCarousel;
