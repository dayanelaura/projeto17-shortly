import joi from 'joi';

export const signUpSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(15).required(),
    confirmPassword: joi.ref('password')
});