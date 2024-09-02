"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
// Return token or refresh token depending of the parameters.
module.exports = (user, tokenType, expiresIn) => {
    return jwt.sign({
        id: user.id,
        name: user,
        email: user.email,
        role: user.role,
        type: tokenType,
    }, process.env.JWT_KEY, { expiresIn });
};
//# sourceMappingURL=createToken.js.map