import TaskModel from "../../../../DB/models/task.model.js";
import { AppError } from "../../../util/Error/AppError.js";
import { catchError } from "../../../util/Error/catchError.js";

export const getAllTasks = catchError(async (req, res) => {
  const result = await TaskModel.find({ user: req.user._id });
  res.json({ message: "success", result });
});

export const getSpeTask = catchError(async (req, res) => {
  const result = await TaskModel.findOne({
    user: req.user._id,
    _id: req.params.id,
  });
  res.json({ message: "success", result });
});

export const createTask = catchError(async (req, res) => {
  req.body.user = req.user._id;
  const task = await TaskModel.create(req.body);
  res.status(201).json({ message: "success", task });
});

export const deleteTask = catchError(async (req, res) => {
  const result = await TaskModel.findOneAndDelete({
    user: req.user._id,
    _id: req.params.id,
  });
  if (!result) throw new AppError("Not Allowed", 404);
  else res.json({ message: "success", result });
});

export const updateTask = catchError(async (req, res) => {
  const { title, description } = req.body;
  const task = await TaskModel.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!task) throw new AppError("Task not found", 404);

  if (title) task.title = title;
  if (description) task.description = description;

  await task.save();

  res.json({ message: "success", task });
});
