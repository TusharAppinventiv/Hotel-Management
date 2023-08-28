import * as Joi from 'joi';

export const roomServiceValidator = (req: any, res:any, next: () => void) => {
    const serviceCreate = Joi.object({
        serviceName: Joi.string().required(),
        serviceDescription: Joi.string().required(),
        servicePrice: Joi.number().required(),
    })
    const result = serviceCreate.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
}

export const roomServiceRequestValidator = (req: any, res:any, next: () => void) => {
    const requestService = Joi.object({
        room_id: Joi.number().required(),
        service_id: Joi.number().required(),
        secret_key: Joi.string().required()
    })
    const result = requestService.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
}