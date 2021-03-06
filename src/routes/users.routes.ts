import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/accounts/useCases/createUser/CreateUserController";
import UploadUserAvatarController from "../modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarController";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
usersRoutes.post("/", createUserController.handle);

const uploadUserAvatarController = new UploadUserAvatarController();
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  uploadUserAvatarController.handle,
);

export default usersRoutes;
