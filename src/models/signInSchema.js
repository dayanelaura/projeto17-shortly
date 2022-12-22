import joi from 'joi';

export const signInSchema = joi.object({
    name: joi.string().min(1).required(),
    password: joi.string().min(3).max(15).required()
});