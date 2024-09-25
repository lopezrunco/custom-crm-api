import { ResponseType } from "common";
import { returnCredentials } from "./returnCredentials";
import IUser from "../interfaces/user.interface";
const createToken = require("../utils/createToken");

jest.mock("../utils/createToken");

describe("returnCredentials utility", () => {
  let mockResponse: ResponseType;
  let mockUser: IUser;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
    } as unknown as ResponseType;
  });

  mockUser = {
    toJSON: jest.fn().mockReturnValue({
      id: "123",
      email: "test@example.com",
      password: "hashed_password",
      mfaSecret: "secret",
    }),
  } as unknown as IUser;

  (createToken as jest.Mock).mockImplementation(() => "mock_token");

  it("should return user data without password & mfaSecret", () => {
    returnCredentials(mockUser, mockResponse);

    expect(mockUser.toJSON).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith({
      user: {
        id: "123",
        email: "test@example.com",
        token: "mock_token",
        refreshToken: "mock_token",
      },
    });
  });
});
