import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  keyframes,
  Icon,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import memoji from 'assets/memoji.png';
import { VscGithubInverted } from 'react-icons/vsc';
import { FaLinkedin, FaThreads } from 'react-icons/fa6';

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
        bgColor="gray.50"
        justify="center"
        align="center"
        gap={6}
        direction="column"
      >
        <Image src={memoji} alt="memoji" height="10em" />
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
        <Flex justify="center" align="center" gap={6} direction="row">
          <Tooltip
            label="GitHub"
            aria-label="github tooltip"
            placement="top"
            hasArrow
            openDelay={500}
          >
            <IconButton
              as="a"
              isRound
              variant="solid"
              colorScheme="brand"
              aria-label="github"
              size="lg"
              icon={<VscGithubInverted color="white" fontSize="1.5em" />}
              href="https://github.com/stitcombe"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Tooltip>
          <Tooltip
            label="LinkedIn"
            aria-label="linkedin tooltip"
            placement="top"
            hasArrow
            openDelay={500}
          >
            <IconButton
              as="a"
              isRound
              variant="solid"
              colorScheme="brand"
              aria-label="linkedin"
              size="lg"
              icon={<FaLinkedin color="white" fontSize="1.3em" />}
              href="https://www.linkedin.com/in/stephentitcombe/"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Tooltip>
          <Tooltip
            label="Threads"
            aria-label="threads tooltip"
            placement="top"
            hasArrow
            openDelay={500}
          >
            <IconButton
              as="a"
              isRound
              variant="solid"
              colorScheme="brand"
              aria-label="threads"
              size="lg"
              icon={<FaThreads color="white" fontSize="1.5em" />}
              href="https://www.threads.net/@spault"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Tooltip>
        </Flex>
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
