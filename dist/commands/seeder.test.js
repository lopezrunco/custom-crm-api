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
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const user_1 = __importDefault(require("../models/user"));
const seeder_1 = require("./seeder");
// Mock the mongoose methods to avoid actual DB connections during the tests.
jest.mock("mongoose", () => ({
    connect: jest.fn(),
    connection: {
        close: jest.fn(),
    },
}));
// Mock the insertMany method of the User model to avoid actual DB writing.
jest.mock("../models/user", () => ({
    insertMany: jest.fn(),
}));
// Mock logging.
jest.mock("../config/logging", () => ({
    info: jest.fn(),
    error: jest.fn(),
}));
describe("seeder.ts", () => {
    // Clear all mocked functions call before each test to isolate the tests and avoid false positives.
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const mockInsertMany = user_1.default.insertMany;
    const mockConnect = mongoose_1.default.connect;
    const mockClose = mongoose_1.default.connection.close;
    const mockLoggingInfo = logging_1.default.info;
    const mockLoggingError = logging_1.default.error;
    test("should seed the correct number of users", () => __awaiter(void 0, void 0, void 0, function* () {
        // Verify that the seedData function from seeder.ts file correctly seeds user data into the database.
        // Mock the implementations.
        // Resolve with empty array or object, simulating a successful insertion.
        mockInsertMany.mockResolvedValue([]);
        mockConnect.mockResolvedValue({});
        mockClose.mockResolvedValue({});
        yield (0, seeder_1.seedData)();
        // Check that mockInsertMany was called with an array of objects that match the expected structure.
        expect(mockInsertMany).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                mfaEnabled: expect.any(Boolean),
                mfaSecret: expect.any(String),
                role: expect.any(String),
            }),
        ]));
        // Check that logging info messages were called & loggin error messages not.
        expect(mockLoggingInfo).toHaveBeenCalledWith("Running data seed...");
        expect(mockLoggingInfo).toHaveBeenCalledWith("10 users to seed...");
        expect(mockLoggingInfo).toHaveBeenCalledWith("Done!");
        expect(mockLoggingError).not.toHaveBeenCalled();
    }));
    test("should handle DB connection errors", () => __awaiter(void 0, void 0, void 0, function* () {
        // Test how the seedData function handles errors when connecting to the database.
        // Ensures the errors are logged correctly.
        // Simulate a DB connection error.
        mockConnect.mockRejectedValue(new Error("Connection failed"));
        yield (0, seeder_1.seedData)();
        expect(mockLoggingError).toHaveBeenCalledWith("Error connecting to database: Error: Connection failed");
        expect(mockLoggingInfo).toHaveBeenCalledWith("Running data seed...");
        expect(mockLoggingInfo).toHaveBeenCalledWith("10 users to seed...");
        const mockInsertMany = user_1.default.insertMany;
        expect(mockInsertMany).not.toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalled();
    }));
    test("should hanlde errors during user insertion", () => __awaiter(void 0, void 0, void 0, function* () {
        // Test how the seedData function handles errors when inserting data into the database.
        // Mock DB connection succeed.
        mockConnect.mockResolvedValue({});
        // Mock error during the user insertion.
        mockInsertMany.mockRejectedValue(new Error("Insertion failed"));
        yield (0, seeder_1.seedData)();
        expect(mockLoggingError).toHaveBeenCalledWith("Error connecting to database: Error: Insertion failed");
        expect(mockLoggingInfo).toHaveBeenCalledWith("Running data seed...");
        expect(mockLoggingInfo).toHaveBeenCalledWith("10 users to seed...");
        expect(mockClose).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=seeder.test.js.map