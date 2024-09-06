import mongoose from "mongoose";

import logging from "../config/logging";
import User from "../models/user";
import { seedData } from "./seeder";

// Mock the mongoose methods to avoid actual DB connections during the tests.
jest.mock("mongoose", () => ({
  connect: jest.fn(),
  connection: {
    close: jest.fn(),
  },
}));

// Mock the insertMany method of the User model to avoid actual DB writing.
jest.mock("../models/user", () => ({
  insertMany: jest.fn(),
}));

// Mock logging.
jest.mock("../config/logging", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("seeder.ts", () => {
  // Clear all mocked functions call before each test to isolate the tests and avoid false positives.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should seed the correct number of users", async () => {
    // Verify that the seedData function from seeder.ts file correctly seeds user data into the database.

    const mockInsertMany = User.insertMany as jest.Mock;
    const mockConnect = mongoose.connect as jest.Mock;
    const mockClose = mongoose.connection.close as jest.Mock;
    const mockLoggingInfo = logging.info as jest.Mock;
    const mockLoggingError = logging.error as jest.Mock;

    // Mock the implementations.
    // Resolve with empty array or object, simulating a successful insertion.
    mockInsertMany.mockResolvedValue([]);
    mockConnect.mockResolvedValue({});
    mockClose.mockResolvedValue({});

    await seedData();

    // Check that mockInsertMany was called with an array of objects that match the expected structure.
    expect(mockInsertMany).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          mfaEnabled: expect.any(Boolean),
          mfaSecret: expect.any(String),
          role: expect.any(String),
        }),
      ])
    );

    // Check that logging info messages were called & loggin error messages not.
    expect(mockLoggingInfo).toHaveBeenCalledWith("Running data seed...");
    expect(mockLoggingInfo).toHaveBeenCalledWith("10 users to seed...");
    expect(mockLoggingInfo).toHaveBeenCalledWith("Done!");
    expect(mockLoggingError).not.toHaveBeenCalled();
  });

  test("should handle DB connection errors", async () => {
    // Test how the seedData function handles errors when connecting to the database.
    // Ensures the errors are logged correctly.

    const mockConnect = mongoose.connect as jest.Mock;
    const mockClose = mongoose.connection.close as jest.Mock;
    const mockLoggingInfo = logging.info as jest.Mock;
    const mockLoggingError = logging.error as jest.Mock;

    // Simulate a DB connection error.
    mockConnect.mockRejectedValue(new Error("Connection failed"));

    await seedData();

    expect(mockLoggingError).toHaveBeenCalledWith(
      "Error connecting to database: Error: Connection failed"
    );
    expect(mockLoggingInfo).toHaveBeenCalledWith("Running data seed...");
    expect(mockLoggingInfo).toHaveBeenCalledWith("10 users to seed...");

    const mockInsertMany = User.insertMany as jest.Mock;
    expect(mockInsertMany).not.toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });
});
