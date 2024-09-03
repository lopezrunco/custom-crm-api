import { RequestType, ResponseType } from "common";
import User from "../../models/user";

module.exports = (req: RequestType, res: ResponseType) => {
  User.findOne({ _id: req.params.id })
    .select("-password -mfaSecret")
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Error trying to get the user.",
      });
    });
};
