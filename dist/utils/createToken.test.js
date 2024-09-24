const jwt = require("jsonwebtoken");
const createToken = require("./createToken");
jest.mock("jsonwebtoken");
describe("createToken utility", () => {
    const user = {
        id: "123",
        name: "John Wick",
        email: "john@example.com",
        role: "CUSTOMER",
    };
    const tokenType = "CONSUMER_TOKEN_TYPE";
    const expiresIn = "1h";
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should return a signed token", () => {
        const expectedToken = "mockedToken";
        // Mock the jwt.sign method.
        jwt.sign.mockReturnValue(expectedToken);
        const token = createToken(user, tokenType, expiresIn);
        expect(jwt.sign).toHaveBeenCalledWith({
            id: user.id,
            name: user,
            email: user.email,
            role: user.role,
            type: tokenType,
        }, process.env.JWT_KEY, { expiresIn });
        expect(token).toBe(expectedToken);
    });
});
//# sourceMappingURL=createToken.test.js.map