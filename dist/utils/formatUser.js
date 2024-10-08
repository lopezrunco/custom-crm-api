"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUser = void 0;
const formatUser = (user, defaultId, defaultName = "Desconocido") => {
    return user
        ? { _id: user._id, name: user.name }
        : { _id: defaultId, name: defaultName };
};
exports.formatUser = formatUser;
//# sourceMappingURL=formatUser.js.map