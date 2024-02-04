import React from 'react';
import { Box, Flex, Heading, Image, keyframes, Icon } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import memoji from 'assets/memoji.png';

// feature flags
const showChevron = false;

const chevronBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
`;

function App() {
  const chevronAnimation = `${chevronBounce} infinite 2s ease`;

  return (
    <Box>
      <Flex
        height={showChevron ? 'calc(100vh - 10vh)' : '100vh'}
        minH="sm"
        bgColor="gray.100"
        justify="center"
        align="center"
        gap={6}
        direction="column"
      >
        <Image src={memoji} alt="stephen's memoji" height="10em" />
        <Heading
          as="h1"
          fontSize="6xl"
          bgGradient="linear(to-l, #0071BE, #981D87)"
          bgClip="text"
          textAlign="center"
          wordBreak="keep-all"
        >
          Hi, I&apos;m Stephen Titcombe.
        </Heading>
      </Flex>
      {showChevron && (
        <Flex justify="center" bgColor="gray.100">
          <Icon
            as={FaChevronDown}
            mt={6}
            animation={chevronAnimation}
            boxSize={12}
            _hover={{
              animationPlayState: 'paused',
            }}
            color="gray.700"
            cursor="pointer"
          />
        </Flex>
      )}
    </Box>
  );
}

export default App;
