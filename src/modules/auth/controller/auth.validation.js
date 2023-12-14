import joi from "joi";

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
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{9,}$/
          ),
          `It must contain at least one uppercase letter.
            It must contain at least one lowercase letter.
            It must contain at least one digit.
            It must contain at least one special character.
            It must be at least 9 characters long.`
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
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{9,}$/
          ),
          `It must contain at least one uppercase letter.
            It must contain at least one lowercase letter.
            It must contain at least one digit.
            It must contain at least one special character.
            It must be at least 9 characters long.`
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
        .pattern(new RegExp(/^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/))
        ,
      email: joi.string().email(),
      password: joi
        .string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{9,}$/
          ),
          `It must contain at least one uppercase letter.
            It must contain at least one lowercase letter.
            It must contain at least one digit.
            It must contain at least one special character.
            It must be at least 9 characters long.`
        )
        ,
      rePassword: joi.string().valid(joi.ref("password")),
    })
    .required(),
};