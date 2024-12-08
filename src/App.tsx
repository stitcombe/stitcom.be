import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  Icon,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import memoji from 'assets/memoji.png';
import { VscGithubInverted } from 'react-icons/vsc';
import { FaLinkedin, FaThreads } from 'react-icons/fa6';

function App() {
  return (
    <Box>
      <Flex
        height='100vh'
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
    </Box>
  );
}

export default App;
