import { Request, Response } from "express";
import bcrypt from "bcrypt";
import otplib from "otplib";

const login = require("./login");
import User from "../../models/user";
import logging from "../../config/logging";
import { returnCredentials } from "../../utils/returnCredentials";

jest.mock("../../models/user");
jest.mock("../../config/logging");
jest.mock("../../utils/returnCredentials");

describe("login controller", () => {
  // Partial mocks of Request and Response objects.
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    // Mock the request with a demo user.
    req = {
      body: {
        email: "test@example.com",
        password: "password",
        token: "123456",
      },
    };
    // Mock the response methods status, end and json.
    res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
      json: jest.fn(),
    };
  });

  // Clear all the mocks.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test login without MFA.
  it("should return credentials for a successful login without MFA", async () => {
    const user = {
      email: "test@example.com",
      password: bcrypt.hashSync("password", 10),
      mfaEnabled: false,
    };

    (User.findOne as jest.Mock).mockResolvedValue(user);

    await login(req as Request, res as Response);

    expect(returnCredentials).toHaveBeenCalledWith(user, res);
    expect(res.status).not.toHaveBeenCalled();
  });

  // Test login with incorrect password.
  it("should return 401 for invalid password", async () => {
    const user = {
      email: "test@example.com",
      password: bcrypt.hashSync("wrongpassword", 10),
      mfaEnabled: false,
    };

    (User.findOne as jest.Mock).mockResolvedValue(user);

    await login(req as Request, res as Response);

    expect(logging.error).toHaveBeenCalledWith("Password does not match.");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
  });

  // Test user not found.
  it("should return 401 when the user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await login(req as Request, res as Response);

    expect(logging.error).toHaveBeenCalledWith("User not found.");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
  });
});

