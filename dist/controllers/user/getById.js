"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const user_1 = __importDefault(require("../../models/user"));
module.exports = (req, res) => {
    user_1.default.findOne({ _id: req.params.id })
        .select("-password -mfaSecret")
        .then((user) => {
        res.status(200).json({ user });
    })
        .catch((error) => {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({
            message: "Error trying to get the user.",
        });
    });
};
//# sourceMappingURL=getById.js.map