import { Request, Response } from "express";

const getUserById = require("./getById");
import User from "../../models/user";
import logging from "../../config/logging";

// Mock the User model methods and logging functions.
jest.mock("../../models/user", () => ({
  findOne: jest.fn(),
}));

jest.mock("../../config/logging", () => ({
  error: jest.fn(),
}));

describe("getUserById controller", () => {
  // Partial mocks of Request & Response objects.
  let req: Partial<Request>;
  let res: Partial<Response>;

  // Mock json and status to simulate a response behaviour.
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({
    json,
    sendStatus: jest.fn(),
    send: jest.fn(),
  });

  // clean the mocks.
  beforeEach(() => {
    req = { params: {} };
    res = { status };
    json.mockClear();
    status.mockClear();
    (User.findOne as jest.Mock).mockClear();
    (logging.error as jest.Mock).mockClear();
  });

  const user = { name: "Dante Alighieri" };

  // Mock User.findOne to return a query object with a select method.
  (User.findOne as jest.Mock).mockReturnValue({
    select: jest.fn().mockResolvedValue(user),
  });

  // Test successful user retrieval.
  test("should return the user if it is found", async () => {
    req.params.id = "12345";

    await getUserById(req as Request, res as Response);

    expect(User.findOne).toHaveBeenCalledWith({ _id: "12345" });
    expect(User.findOne().select).toHaveBeenCalledWith("-password -mfaSecret");
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ user });
  });
});
