"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggingMiddleware_1 = require("./loggingMiddleware");
const logging_1 = __importDefault(require("../config/logging"));
jest.mock("../config/logging");
describe("logging liddleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        // Mock the request object.
        req = {
            method: "GET",
            url: "/test",
            socket: {
                remoteAddress: "127.0.0.1",
            },
        };
        res = {
            // On: simulates the 'on' method of the Express response object.
            // mockImplementation allows to define a behavior of the mock function:
            // in this case we provide a custom implementation that takes two parameters:
            // event and callback.
            on: jest
                .fn()
                .mockImplementation((event, callback) => {
                // Check if the event being listened for is 'finish'.
                // If it is finished, callback is called inmediatly.
                // This simulates the event ocurring and allow to test what happens when the response is finished.
                if (event === "finish") {
                    callback;
                }
                return res; // This line ensures that the method can be chained (common in Express).
            }),
            statusCode: 200,
        };
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should log request method, URL, and IP address", () => {
        (0, loggingMiddleware_1.loggingMiddleware)(req, res, next);
        expect(logging_1.default.info).toHaveBeenCalledWith("METHOD: 'GET' - URL: '/test' - IP: '127.0.0.1'");
        expect(next).toHaveBeenCalled();
    });
});
//# sourceMappingURL=loggingMiddleware.test.js.map