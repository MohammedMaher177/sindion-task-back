import joi from "joi";
import { idValidation } from "../../../util/helper-functions.js";

export const createTaskValidation = {
  body: joi
    .object({
      title: joi.string().min(5).max(30).required(),
      description: joi.string().required().min(10).max(300),
    })
    .required(),
};
export const updateTaskValidation = {
  body: joi
    .object({
      title: joi.string().min(5).max(30),
      description: joi.string().min(10).max(300),
    })
    .required(),
};

export const paramTaskValidation = {
  params: joi.object({
    id: idValidation,
  }),
};
