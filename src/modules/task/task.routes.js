import { Router } from "express";
import { authMiddleware } from "../../middleware/authentication.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSpeTask,
  updateTask,
} from "./controller/task.controller.js";
import { validate } from "../../middleware/validation.js";
import {
  createTaskValidation,
  paramTaskValidation,
  updateTaskValidation,
} from "./controller/task.validation.js";

const taskRouter = Router();

taskRouter
  .route("/")
  .post(authMiddleware, validate(createTaskValidation), createTask)
  .get(authMiddleware, getAllTasks);

taskRouter
  .route("/:id")
  .get(authMiddleware, validate(paramTaskValidation), getSpeTask)
  .delete(authMiddleware, validate(paramTaskValidation), deleteTask)
  .put(authMiddleware, validate(updateTaskValidation), updateTask);

export default taskRouter;
