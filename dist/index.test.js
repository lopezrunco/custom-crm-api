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
const getDBConnectionString_1 = require("./utils/getDBConnectionString");
const app = require('./index');
jest.mock('./config/logging');
describe('server initialization', () => {
    const originalConnect = mongoose_1.default.connect;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(mongoose_1.default, 'connect').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.resolve(mongoose_1.default); }));
        yield mongoose_1.default.connect((0, getDBConnectionString_1.getDbConnectionString)());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.connect = originalConnect;
        yield mongoose_1.default.disconnect();
        console.log("Disconnected from MongoDB");
    }));
    it('should initialize the express app', () => {
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=index.test.js.map