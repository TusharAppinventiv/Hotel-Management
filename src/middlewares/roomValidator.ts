import * as Joi from 'joi';

export const roomValidator = (req: any, res:any, next: () => void) => {
    const roomCreate = Joi.object({
        room_noS: Joi.string().required().max(3),
        room_description: Joi.string().required(),
        room_size: Joi.string().required().max(1),
        room_price: Joi.number().required(),
        room_availability: Joi.boolean()
    })
    const result = roomCreate.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
}