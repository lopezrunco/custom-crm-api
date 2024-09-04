"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const logging_1 = __importDefault(require("./config/logging"));
const getDBConnectionString_1 = require("./utils/getDBConnectionString");
const routes_1 = require("./routes");
const loggingMiddleware_1 = require("./middlewares/loggingMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://tecmedios.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(loggingMiddleware_1.loggingMiddleware);
app.use(body_parser_1.default.json());
(0, routes_1.routes)(app);
const port = process.env.PORT || 3000;
mongoose_1.default
    .connect((0, getDBConnectionString_1.getDbConnectionString)())
    .then(() => {
    app.listen(port);
    logging_1.default.info(`Server is listening on http://localhost:${port}`);
    logging_1.default.info("Connected to database.");
})
    .catch((error) => {
    logging_1.default.error("Could not connect to the database => ", error);
});
//# sourceMappingURL=index.js.map