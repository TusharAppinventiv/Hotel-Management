// controllers/checkin.controller.js
import { CheckinService } from "../services/checkIn.service";
import { responseMessages, responseStatus } from "../responses/checkIn.response";
import { sendStylzedMail } from "../services/email.service";
import { checkInConstants } from "../constants/checkIn.constants";
import { CheckinTemplateClass } from "../templates/checkIn.template";


export class CheckinController {
  static async createCheckin(req, res) {
    try {
    const data = req.body;
    const booking = await CheckinService.getBookingById(data.booking_id);
    
    if(!booking){
      res.status(responseStatus.notExist).json({
        message: responseMessages.bookingIdNotExist
      })
    }

    const currentDate = new Date();
    if (currentDate != booking.checkin_date) {
      return res.status(responseStatus.badRequest).json({
        message: responseMessages.notCheckInDate
      });
    }

    const alreadyCheckedIn = await CheckinService.isAlreadyCheckedIn(data.booking_id);
    if (alreadyCheckedIn) {
      return res.status(responseStatus.badRequest).json({
        message: responseMessages.alreadyCheckedIn
      });
    }
  

    const user = await CheckinService.getUserById(booking.user_id);
    const room = await CheckinService.getRoomById(booking.room_id);

    const userEmail = user.email;
    const roomNos = room.room_noS;

  
    const checkout_amount = booking.checkout_amount;
    const secret_key = data.secret_key
    const newCheckInData ={
      ...data,
      checkout_amount : checkout_amount,
      checkIn_status: true
    }

    const newCheckIn = CheckinService.createCheckIn(newCheckInData);
 
    const secretKey = data.secret_key;

    const emailContent = CheckinTemplateClass.makeCheckin(userEmail, roomNos, secretKey);

    await sendStylzedMail(userEmail, checkInConstants.checkIn, emailContent);

    return res.status(responseStatus.success).json({
      message: responseMessages.successCheckIn, 
      message2: responseMessages.checinKey, secret_key,
    })
  }catch(error){
    console.log(error);
    return res.status(responseStatus.internalServerError).json({
      message: responseMessages.internalServerError
    })
  }
}
static async checkOut(req,res) {
  try {
    const {checkin_id, email } = req.body;

    const message = await CheckinService.createCheckOut(checkin_id, email);

    return res.status(responseStatus.success).json({
      message: responseMessages.checkoutRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(responseStatus.internalServerError).json({
      message: responseMessages.internalServerError,
    });
  }
}

static async acceptCheckOut(req, res){
  try{
    const {checkin_id, payment_id, email} = req.body;

    const status = await CheckinService.acceptCheckOut(checkin_id, payment_id, email);
    
    return res.status(responseStatus.success).json({
      message: responseMessages.checkoutSuccess, status
    })
  }
  catch(error){
    console.error(error);
    return res.status(responseStatus.internalServerError).json({
      message: responseMessages.internalServerError,
    });
  }
}


static async declineCheckOut(req, res){
  try{
    const {checkin_id, payment_id, email} = req.body;

    const status = await CheckinService.dcelineCheckOut(checkin_id, payment_id, email);
    
    return res.status(responseStatus.success).json({
      message: responseMessages.checkOutDeclined, status
    })
  }
  catch(error){
    console.error(error);
    return res.status(responseStatus.internalServerError).json({
      message: responseMessages.internalServerError,
    });
  }
}

}

