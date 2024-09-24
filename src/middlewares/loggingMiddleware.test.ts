import { Socket } from "net";
import { Request, Response, NextFunction } from "express";

import { loggingMiddleware } from "./loggingMiddleware";
import logging from "../config/logging";

jest.mock("../config/logging");

describe("logging liddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    // Mock the request object.
    req = {
      method: "GET",
      url: "/test",
      socket: {
        remoteAddress: "127.0.0.1",
      } as Socket,
    };

    res = {
      // On: simulates the 'on' method of the Express response object.
      // mockImplementation allows to define a behavior of the mock function:
      // in this case we provide a custom implementation that takes two parameters:
      // event and callback.
      on: jest
        .fn()
        .mockImplementation((event: string, callback: () => void) => {
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
    loggingMiddleware(req as Request, res as Response, next);

    expect(logging.info).toHaveBeenCalledWith(
      "METHOD: 'GET' - URL: '/test' - IP: '127.0.0.1'"
    );
    expect(next).toHaveBeenCalled();
  });
});
