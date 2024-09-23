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
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = require("./login");
const user_1 = __importDefault(require("../../models/user"));
const returnCredentials_1 = require("../../utils/returnCredentials");
jest.mock("../../models/user");
jest.mock("../../config/logging");
jest.mock("../../utils/returnCredentials");
describe("login controller", () => {
    // Partial mocks of Request and Response objects.
    let req;
    let res;
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
    it("should return credentials for a successful login without MFA", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "test@example.com",
            password: bcrypt_1.default.hashSync("password", 10),
            mfaEnabled: false,
        };
        user_1.default.findOne.mockResolvedValue(user);
        yield login(req, res);
        expect(returnCredentials_1.returnCredentials).toHaveBeenCalledWith(user, res);
        expect(res.status).not.toHaveBeenCalled();
    }));
});
//# sourceMappingURL=login.test.js.map