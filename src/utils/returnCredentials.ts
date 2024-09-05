import { ResponseType } from "common";
import IUser from "../interfaces/user.interface";

const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require("../utils/tokenTypes");
const createToken = require("../utils/createToken");

export const returnCredentials = (user: IUser, response: ResponseType) => {
  // Delete the data that will be hidden  in the response.
  const userWithoutPassword = user.toJSON();

  delete userWithoutPassword.password;
  delete userWithoutPassword.mfaSecret;

  userWithoutPassword.token = createToken(user, CONSUMER_TOKEN_TYPE, "20m");
  userWithoutPassword.refreshToken = createToken(
    user,
    REFRESH_TOKEN_TYPE,
    "2d"
  );

  response.json({ user: userWithoutPassword });
};
