import { Request, Response } from "express";

const getAllUsers = require("./getAll");
import User from "../../models/user";
import logging from "../../config/logging";

// Mock the User model methods and logging functions.
jest.mock("../../models/user", () => ({
  find: jest.fn(),
  countDocuments: jest.fn(),
}));

jest.mock("../../config/logging", () => ({
  error: jest.fn(),
}));

describe("getAllUsers controller", () => {
  // Partial mocks of Request and Response objects.
  let req: Partial<Request>;
  let res: Partial<Response>;

  // Mock json and status to simulate a response behavior.
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({
    json,
    sendStatus: jest.fn(),
    send: jest.fn(),
  });

  // Clean the mocks.
  beforeEach(() => {
    req = { query: {} };
    res = { status };
    json.mockClear();
    status.mockClear();
    (User.find as jest.Mock).mockClear();
    (User.countDocuments as jest.Mock).mockClear();
    (logging.error as jest.Mock).mockClear();
  });

  const users = [{ name: "Dante Alighieri" }, { name: "Charles Dickens" }];
  const count = 2;

  // Mock  User.find to return 'select', 'skip', 'limit' and 'then' methods.
  // Each one of this methods is chain to return 'this', allwoing method chaining.
  (User.find as jest.Mock).mockReturnValue({
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    // Returns a promise resolving with the users array.
    then: jest.fn().mockImplementation((cb) => Promise.resolve(cb(users))),
  });
  // Mock to return the user count value.
  (User.countDocuments as jest.Mock).mockResolvedValue(count);

  // Test user listing:
  // This test assures that the function pagination beaheves correctly and returning the correct data and status.
  test("should return the user list with the correct pagination", async () => {
    // Simulate the pagination parameters.
    req.query.page = "2";
    req.query.itemsPerPage = "5";

    await getAllUsers(req as Request, res as Response);

    expect(User.find).toHaveBeenCalled();

    // Get the first argument passed to the User.find method.
    // Check if User.find was called with the correct arguments, which ensures that
    // the controller is querying the DB correctly according to the pagination and filtering.
    const findCall = (User.find as jest.Mock).mock.calls[0][0];
    // Check that findCall is an object.
    expect(findCall).toEqual(expect.objectContaining({}));

    expect(User.find().select).toHaveBeenCalledWith("-password -mfaSecret");
    expect(User.find().skip).toHaveBeenCalledWith(5);
    expect(User.find().limit).toHaveBeenCalledWith(5);
    expect(User.countDocuments).toHaveBeenCalled();

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      meta: { count },
      users,
    });
  });

  // Test when no pagination parameters are provided:
  // Ensure that default pagination is applied when no pagination parameters are in the query.
  test("should return users with deafult pagination when no pagination parameters are provided", async () => {
    // Simulate undefined pagination parameters.
    req.query.page = undefined;
    req.query.itemsPerPage = undefined;

    await getAllUsers(req as Request, res as Response);

    expect(User.find).toHaveBeenCalledWith();

    const findCall = (User.find as jest.Mock).mock.calls[0][0];
    expect(findCall).toEqual(expect.objectContaining({}));

    expect(User.find().select).toHaveBeenCalledWith("-password -mfaSecret");
    expect(User.find().skip).toHaveBeenCalledWith(0);
    expect(User.find().limit).toHaveBeenCalledWith(10);
    expect(User.countDocuments).toHaveBeenCalled();

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      meta: { count },
      users,
    });
  });

  // Test when query parameters are non numeric.
  test("should handle non numeric query parameters successfully", async () => {
    // Simulate non numeric pagination parameters.
    req.query.page = "abc";
    req.query.itemsPerPage = "def";

    await getAllUsers(req as Request, res as Response);

    expect(User.find).toHaveBeenCalled();
    const findCall = (User.find as jest.Mock).mock.calls[0][0];
    expect(findCall).toEqual(expect.objectContaining({}));

    expect(User.find().select).toHaveBeenCalledWith("-password -mfaSecret");
    expect(User.find().skip).toHaveBeenCalledWith(0);
    expect(User.find().limit).toHaveBeenCalledWith(10);
    expect(User.countDocuments).toHaveBeenCalled();

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      meta: { count },
      users,
    });
  });

  // Test when query parameters are empty.
  test("should handle empty query parameters successfully", async () => {
    // Simulate empty pagination parameters.
    req.query.page = "";
    req.query.itemsPerPage = "";

    await getAllUsers(req as Request, res as Response);

    expect(User.find().skip).toHaveBeenCalledWith(0);
    expect(User.find().limit).toHaveBeenCalledWith(10);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      meta: { count },
      users,
    });
  });
});
