"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
module.exports = (req, res) => {
    const pagination = { offset: 0, limit: 10 };
    const page = parseInt(req.query.page, 10);
    const itemsPerPage = parseInt(req.query.itemsPerPage, 10);
    if (page && itemsPerPage) {
        (pagination.offset = (page - 1) * itemsPerPage),
            (pagination.limit = itemsPerPage);
    }
    user_1.default
        .find()
        .select("-password -mfaSecret")
        .skip(pagination.offset)
        .limit(pagination.limit)
        .then(users => {
        user_1.default
            .countDocuments()
            .then(count => {
            const meta = { count };
            res.status(200).json({ meta, users });
        })
            .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Error trying to list the users." });
        });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error trying to list the users." });
    });
};
//# sourceMappingURL=getAll.js.map