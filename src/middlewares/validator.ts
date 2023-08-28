import * as Joi from 'joi';

export const signupValidator = (req: any, res:any, next: () => void) => {
    const signupSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        mobNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        isAdmin: Joi.boolean(),
        isAuthorized: Joi.boolean(),
        session: Joi.boolean()
    })
    const result = signupSchema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
   
}

export const loginValidator = (req: any, res:any, next: () => void) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()  
    })
    const result = loginSchema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
   
}
