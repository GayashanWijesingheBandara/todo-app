import { Pool } from 'pg';

// Mock database for testing
jest.mock('../database/connection', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
    connect: jest.fn(),
  },
  testConnection: jest.fn(),
}));

// Global test setup
beforeAll(async () => {
  // Setup test database or mocks
});

afterAll(async () => {
  // Cleanup
});

beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();
});