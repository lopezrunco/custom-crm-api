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
const getAllUsers = require("./getAll");
const user_1 = __importDefault(require("../../models/user"));
const logging_1 = __importDefault(require("../../config/logging"));
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
    let req;
    let res;
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
        user_1.default.find.mockClear();
        user_1.default.countDocuments.mockClear();
        logging_1.default.error.mockClear();
    });
    const users = [{ name: "Dante Alighieri" }, { name: "Charles Dickens" }];
    const count = 2;
    // Mock  User.find to return 'select', 'skip', 'limit' and 'then' methods.
    // Each one of this methods is chain to return 'this', allwoing method chaining.
    user_1.default.find.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        // Returns a promise resolving with the users array.
        then: jest.fn().mockImplementation((cb) => Promise.resolve(cb(users))),
    });
    // Mock to return the user count value.
    user_1.default.countDocuments.mockResolvedValue(count);
    // Test user listing:
    // This test assures that the function pagination beaheves correctly and returning the correct data and status.
    test("should return the user list with the correct pagination", () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate the pagination parameters.
        req.query.page = "2";
        req.query.itemsPerPage = "5";
        yield getAllUsers(req, res);
        expect(user_1.default.find).toHaveBeenCalled();
        // Get the first argument passed to the User.find method.
        // Check if User.find was called with the correct arguments, which ensures that
        // the controller is querying the DB correctly according to the pagination and filtering.
        const findCall = user_1.default.find.mock.calls[0][0];
        // Check that findCall is an object.
        expect(findCall).toEqual(expect.objectContaining({}));
        expect(user_1.default.find().select).toHaveBeenCalledWith("-password -mfaSecret");
        expect(user_1.default.find().skip).toHaveBeenCalledWith(5);
        expect(user_1.default.find().limit).toHaveBeenCalledWith(5);
        expect(user_1.default.countDocuments).toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({
            meta: { count },
            users,
        });
    }));
    // Test when no pagination parameters are provided:
    // Ensure that default pagination is applied when no pagination parameters are in the query.
    test("should return users with deafult pagination when no pagination parameters are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate undefined pagination parameters.
        req.query.page = undefined;
        req.query.itemsPerPage = undefined;
        yield getAllUsers(req, res);
        expect(user_1.default.find).toHaveBeenCalledWith();
        const findCall = user_1.default.find.mock.calls[0][0];
        expect(findCall).toEqual(expect.objectContaining({}));
        expect(user_1.default.find().select).toHaveBeenCalledWith("-password -mfaSecret");
        expect(user_1.default.find().skip).toHaveBeenCalledWith(0);
        expect(user_1.default.find().limit).toHaveBeenCalledWith(10);
        expect(user_1.default.countDocuments).toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({
            meta: { count },
            users,
        });
    }));
    // Test when query parameters are non numeric.
    test("should handle non numeric query parameters successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate non numeric pagination parameters.
        req.query.page = "abc";
        req.query.itemsPerPage = "def";
        yield getAllUsers(req, res);
        expect(user_1.default.find).toHaveBeenCalled();
        const findCall = user_1.default.find.mock.calls[0][0];
        expect(findCall).toEqual(expect.objectContaining({}));
        expect(user_1.default.find().select).toHaveBeenCalledWith("-password -mfaSecret");
        expect(user_1.default.find().skip).toHaveBeenCalledWith(0);
        expect(user_1.default.find().limit).toHaveBeenCalledWith(10);
        expect(user_1.default.countDocuments).toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({
            meta: { count },
            users,
        });
    }));
});
//# sourceMappingURL=getAll.test.js.map