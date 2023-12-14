import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../../util/Error/AppError.js";
import { catchError } from "../../../util/Error/catchError.js";
import UserModel from "../../../../DB/models/user.model.js";

export const getAllUsers = catchError(async (req, res) => {
  const result = await UserModel.find();
  res.json(result);
});

export const deleteUser = catchError(async (req, res) => {
    const result = await UserModel.findByIdAndDelete(req.params.id);
    res.json(result);
})

export const signup = catchError(async (req, res, next) => {
  const existUser = await UserModel.findOne({ email: req.body.email });
  if (existUser) {
    return next(new AppError("Email Already Exist PLease Login", 403));
  } else {
    const result = await UserModel.create(req.body);
    const token = jwt.sign(
      {
        id: result._id,
        name: result.name,
        email: result.email,
      },
      process.env.TOKEN_SIGNATURE
    );

    return res.status(201).json({ message: "success", token });
  }
});

export const sign_in = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await UserModel.findOne({ email });
  if (!result) {
    return next(new AppError("Email Nor Register, please register as first"));
  }
  const match = bcrypt.compareSync(password, result.password);
  if (!match) {
    return next(new AppError("In-Correct Password", 403));
  }

  const token = jwt.sign(
    { id: result._id, email: result.email },
    process.env.TOKEN_SIGNATURE
  );

  res.status(200).json({ message: "success", token });
});

export const updateUser = catchError(async (req, res, next) => {
  const { user: __user } = req;
  const user = await UserModel.findByIdAndUpdate(__user._id, req.body, {
    new: true,
  });
  res.status(202).json({ message: "success", user });
});
