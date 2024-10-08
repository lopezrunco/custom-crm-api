import IUser from "../interfaces/user.interface";

export const formatUser = (user: IUser, defaultId: any, defaultName: string = "Desconocido") => {
  return user
    ? { _id: user._id, name: user.name }
    : { _id: defaultId, name: defaultName };
};
