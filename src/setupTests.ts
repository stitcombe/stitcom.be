/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
// import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

// extends vitest expect method with methods from react-testing-lbirary
// expect.extend(matchers);

// clears jsdom after each test
afterEach(() => {
  cleanup();
});
