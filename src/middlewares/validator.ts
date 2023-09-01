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

export const deleteValidator = (req: any, res:any, next: () => void) => {
    const deleteValidator = Joi.object({
        email: Joi.string().email().required(),
    })
    const result = deleteValidator.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
   
}

export const updateUserDataValidator = (req: any, res: any, next: () => void) => {
    const updateSchema = Joi.object({
        id: Joi.number().integer().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        mobNumber: Joi.string()
    });

    const { error } = updateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'Invalid User Input', error: error.details });
    }

    next();
};



export const tokenAndPasswordValidationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Invalid input', error: error.details });
  }

  next();
};
