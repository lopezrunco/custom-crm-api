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
const get_db_connection_string_1 = require("./utils/get-db-connection-string");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = process.env.PORT || 3000;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect((0, get_db_connection_string_1.getDbConnectionString)(), mongooseOptions)
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