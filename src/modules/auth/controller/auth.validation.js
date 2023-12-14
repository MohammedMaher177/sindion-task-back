import joi from "joi";
const getCharacterValidationError = (str) => {
  return `It must contain at least 1 ${str} character`;
};
export const signupValidation = {
  body: joi
    .object({
      name: joi
        .string()
        .pattern(new RegExp(/^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/))
        .required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .pattern(new RegExp(/[0-9]/), getCharacterValidationError("digit"))
        .pattern(new RegExp(/[A-Z]/), getCharacterValidationError("uppercase"))
        .pattern(new RegExp(/[a-z]/), getCharacterValidationError("lowercase"))
        .pattern(
          new RegExp(/[!@#$%^&*()\-_=+{};:,<.>]/),
          getCharacterValidationError("special characters")
        )
        .required(),
      rePassword: joi.string().valid(joi.ref("password")).required(),
    })
    .required(),
};
export const signInValidation = {
  body: joi
    .object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .pattern(new RegExp(/[0-9]/), getCharacterValidationError("digit"))
        .pattern(new RegExp(/[A-Z]/), getCharacterValidationError("uppercase"))
        .pattern(new RegExp(/[a-z]/), getCharacterValidationError("lowercase"))
        .pattern(
          new RegExp(/[!@#$%^&*()\-_=+{};:,<.>]/),
          getCharacterValidationError("special characters")
        )
        .required(),
    })
    .required(),
};

export const updateValidation = {
  body: joi
    .object({
      name: joi
        .string()
        .pattern(new RegExp(/^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/)),
      email: joi.string().email(),
      password: joi
        .string()
        // 'Password should be of minimum 8 characters length'
        .min(8)
        .pattern(new RegExp(/[0-9]/), getCharacterValidationError("digit"))
        .pattern(new RegExp(/[A-Z]/), getCharacterValidationError("uppercase"))
        .pattern(new RegExp(/[a-z]/), getCharacterValidationError("lowercase"))
        .pattern(
          new RegExp(/[!@#$%^&*()\-_=+{};:,<.>]/),
          getCharacterValidationError("special characters")
        )
        .required(),
      rePassword: joi.string().valid(joi.ref("password")),
    })
    .required(),
};
