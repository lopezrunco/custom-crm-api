"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnectionString = void 0;
const getDbConnectionString = () => {
    const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
    if (DB_USER && DB_PASSWORD && DB_HOST && DB_NAME) {
        // return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
        return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;
    }
    else if (DB_HOST && DB_PORT && DB_NAME) {
        return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    }
    else {
        throw new Error("Database connection parameters are missing or incomplete.");
    }
};
exports.getDbConnectionString = getDbConnectionString;
//# sourceMappingURL=get-db-connection-string.js.map