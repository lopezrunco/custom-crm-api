"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnCredentials_1 = require("./returnCredentials");
const createToken = require("../utils/createToken");
jest.mock("../utils/createToken");
describe("returnCredentials utility", () => {
    let mockResponse;
    let mockUser;
    beforeEach(() => {
        mockResponse = {
            json: jest.fn(),
        };
    });
    mockUser = {
        toJSON: jest.fn().mockReturnValue({
            id: "123",
            email: "test@example.com",
            password: "hashed_password",
            mfaSecret: "secret",
        }),
    };
    createToken.mockImplementation(() => "mock_token");
    it("should return user data without password & mfaSecret", () => {
        (0, returnCredentials_1.returnCredentials)(mockUser, mockResponse);
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
//# sourceMappingURL=returnCredentials.test.js.map