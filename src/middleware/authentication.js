import jwt from "jsonwebtoken";
import { catchError } from "../util/Error/catchError.js";
import { AppError } from "../util/Error/AppError.js";
import UserModel from "../../DB/models/user.model.js";

export const authMiddleware = catchError(async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    return next(new AppError("authorization is required", 403));
  }
  const decoded = jwt.verify(authorization, process.env.TOKEN_SIGNATURE);

  if (!decoded?.id) {
    return next(new AppError("Invalid Token payload", 401));
  }
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(new AppError("Email not found", 404));
  }

  req.user = user;
  return next();
});

export const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role.toLowerCase())) {
      return next(new AppError("Not Authorized", 401));
    }
    next();
  });
};
