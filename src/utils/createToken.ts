import IUser from "../interfaces/user";

const jwt = require("jsonwebtoken");

// Return token or refresh token depending of the parameters.
module.exports = (user: IUser, tokenType: string, expiresIn: string) => {
  return jwt.sign({
      id: user.id,
      name: user,
      email: user.email,
      role: user.role,
      type: tokenType,
    }, process.env.JWT_KEY,{ expiresIn });
};
