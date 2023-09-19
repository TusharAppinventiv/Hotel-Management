import * as Joi from 'joi';

export const bookingValidator = (req: any, res:any, next: () => void) => {
    const bookingCreate = Joi.object({
        user_id: Joi.number().required(),
        room_id: Joi.number().required(),
        checkin_date: Joi.string().required(),
        checkout_date: Joi.string().required(),
    })
    const result = bookingCreate.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
   
}

export const bookingConfirmation = (req: any, res:any, next: () => void) => {
    const confirmBooking = Joi.object({
        "booking_id": Joi.number().required(),
        "payment_id": Joi.string().required()
    })
    const result = confirmBooking.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
   
}

export const BookingDeny = (req: any, res:any, next: () => void) => {
    const denyBooking = Joi.object({
        "booking_id": Joi.number().required(),
        "payment_id": Joi.string().required()
    })
    const result = denyBooking.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }

}
 export const checkIn = (req: any, res:any, next: () => void) => {
        const checkIn = Joi.object({
            "booking_id": Joi.number().required(),
            "secret_key": Joi.string().required()
        })
        const result = checkIn.validate(req.body);
        if(result.error){
            res.status(400).send(result.error).json({message: 'Invalid User Input'});
        }else{
            next();
        }
        
}

export const checkout = (req: any, res:any, next: () => void) => {
    const checkIn = Joi.object({
        "checkin_id": Joi.number().required(),
        "email": Joi.string().required()
    })
    const result = checkIn.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
    
}

export const acceptCheckout = (req: any, res:any, next: () => void) => {
    const acceptCheckOut = Joi.object({
        "checkin_id": Joi.number().required(),
        "payment_id": Joi.string().required(),
        "email": Joi.string().required()
    })
    const result = acceptCheckOut.validate(req.body);
    if(result.error){
        res.status(400).send(result.error).json({message: 'Invalid User Input'});
    }else{
        next();
    }
    
}