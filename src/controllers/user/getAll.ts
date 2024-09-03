import { RequestType, ResponseType } from "common";

import User from "../../models/user";

module.exports = (req: RequestType, res: ResponseType) => {
  const pagination = { offset: 0, limit: 10 };
  const page = parseInt(req.query.page as string, 10);
  const itemsPerPage = parseInt(req.query.itemsPerPage as string, 10);

  if (page && itemsPerPage) {
    (pagination.offset = (page - 1) * itemsPerPage),
      (pagination.limit = itemsPerPage);
  }

  User
    .find()
    .select("-password -mfaSecret")
    .skip(pagination.offset)
    .limit(pagination.limit)
    .then(users => {
      User
        .countDocuments()
        .then(count => {
          const meta = { count };
          res.status(200).json({ meta, users });
        })
        .catch((error: Error) => {
          console.log(error);
          res.status(500).json({ message: "Error trying to list the users." });
        });
    })
    .catch((error: Error) => {
      console.log(error);
      res.status(500).json({ message: "Error trying to list the users." });
    });
};
