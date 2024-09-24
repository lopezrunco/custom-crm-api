"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register = require("./register");
const user_1 = __importDefault(require("../../models/user"));
const createToken = require("../../utils/createToken");
jest.mock("../../models/user");
jest.mock("../../utils/createToken");
describe("register controller", () => {
    // Partial mocks of Request and Response objects.
    let req;
    let res;
    let jsonResponse;
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
    it("should register a new user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        };
        user_1.default.create.mockResolvedValue({
            toObject: () => user,
        });
        createToken.mockReturnValue("mockToken");
        yield register(req, res);
        expect(res.json).toHaveBeenCalledWith({
            user: {
                name: user.name,
                email: user.email,
                token: "mockToken",
                refreshToken: "mockToken",
            },
        });
    }));
    // Test invalid user.
    it('should return 400 if validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUser = {
            name: 'John123',
            email: 'invalid-email',
            password: 'short',
        };
        req.body = invalidUser;
        yield register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: expect.anything(),
        });
    }));
});
//# sourceMappingURL=register.test.js.map