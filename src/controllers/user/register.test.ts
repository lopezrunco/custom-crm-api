import { Request, Response } from "express";

const register = require("./register");
import User from "../../models/user";
const createToken = require("../../utils/createToken");

jest.mock("../../models/user");
jest.mock("../../utils/createToken");

interface UserType {
  name: string;
  email: string;
  password: string;
  mfaSecret?: string | null; // mfaSecret can be a string or null
}

describe("register controller", () => {
  // Partial mocks of Request and Response objects.
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonResponse: any;

  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // Clear all the mocks.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test user register.
  it("should register a new user successfully", async () => {
    const user = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    (User.create as jest.Mock).mockResolvedValue({
      toObject: (): UserType => user,
    });

    (createToken as jest.Mock).mockReturnValue("mockToken");

    await register(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      user: {
        name: user.name,
        email: user.email,
        token: "mockToken",
        refreshToken: "mockToken",
      },
    });
  });

  // Test invalid user.
  it('should return 400 if validation fails', async () => {
    const invalidUser = {
      name: 'John123',
      email: 'invalid-email',
      password: 'short',
    };

    req.body = invalidUser;

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.anything(),
    });
  });
});
