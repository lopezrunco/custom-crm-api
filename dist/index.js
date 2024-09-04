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
const geDBConnectionString_1 = require("./utils/geDBConnectionString");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://tecmedios.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(body_parser_1.default.json());
const port = process.env.PORT || 3000;
mongoose_1.default
    .connect((0, geDBConnectionString_1.getDbConnectionString)())
    .then(() => {
    app.listen(port);
    console.log(`Server is listening on http://localhost:${port}`);
    console.log("Connected to database.");
})
    .catch((error) => {
    console.error("Could not connect to the database => ", error);
});
(0, routes_1.routes)(app);
//# sourceMappingURL=index.js.map