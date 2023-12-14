import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  sign_in,
  signup,
  updateUser,
} from "./controller/auth.controller.js";
import { signInValidation, signupValidation, updateValidation } from "./controller/auth.validation.js";
import { validate } from "../../middleware/validation.js";
import { authMiddleware } from "../../middleware/authentication.js";

const authRouter = Router();

authRouter.get("/", getAllUsers);
authRouter.delete("/:id", deleteUser);
authRouter.post("/signup", validate(signupValidation), signup);
authRouter.post("/signin", validate(signInValidation), sign_in);
authRouter.put("/", authMiddleware, validate(updateValidation), updateUser);

export default authRouter;
