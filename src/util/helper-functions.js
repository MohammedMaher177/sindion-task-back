import joi from "joi";

export const idValidation = joi.string().hex().length(24).required();
