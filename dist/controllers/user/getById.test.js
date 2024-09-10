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
const getUserById = require("./getById");
const user_1 = __importDefault(require("../../models/user"));
const logging_1 = __importDefault(require("../../config/logging"));
// Mock the User model methods and logging functions.
jest.mock("../../models/user", () => ({
    findOne: jest.fn(),
}));
jest.mock("../../config/logging", () => ({
    error: jest.fn(),
}));
describe("getUserById controller", () => {
    // Partial mocks of Request & Response objects.
    let req;
    let res;
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
        user_1.default.findOne.mockClear();
        logging_1.default.error.mockClear();
    });
    const user = { name: "Dante Alighieri" };
    // Mock User.findOne to return a query object with a select method.
    user_1.default.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
    });
    // Test successful user retrieval.
    test("should return the user if it is found", () => __awaiter(void 0, void 0, void 0, function* () {
        req.params.id = "12345";
        yield getUserById(req, res);
        expect(user_1.default.findOne).toHaveBeenCalledWith({ _id: "12345" });
        expect(user_1.default.findOne().select).toHaveBeenCalledWith("-password -mfaSecret");
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({ user });
    }));
});
//# sourceMappingURL=getById.test.js.map