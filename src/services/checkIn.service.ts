// services/checkin.service.js
import { checkInConstants } from "../constants/checkIn.constants";
import PaymentStatus from "../constants/enum";
import bookingModel from "../models/booking.model";
import checkOutServiceModel from "../models/checkInOut.model";
import checkoutRecordModel from "../models/checkOutStatus.model";
import roomModel from "../models/rooms.model";
import userModel from "../models/users.model";
import { responseMessages } from "../responses/checkIn.response";
import { CheckinTemplateClass } from "../templates/checkIn.template";
import { sendStylzedMail } from "./email.service";

export class CheckinService {
  static async createCheckIn(checkinData) {
     return checkOutServiceModel.create(checkinData)
    }

    static async getBookingById(bookingId) {
        try {
            const booking = await bookingModel.findByPk(bookingId); 
            return booking;
        } catch (error) {
            console.error("Error fetching booking by ID:", error);
            throw new Error("Error fetching booking by ID");
        }
    }

    static async getRoomById(roomId) {
        try {
          const room = await roomModel.findByPk(roomId);
          return room;
        } catch (error) {
          console.error('Error getting room by ID:', error);
          throw error;
        }
      }
    
      static async getUserById(userId) {
        try {
          const user = await userModel.findByPk(userId);
          return user;
        } catch (error) {
          console.error('Error getting user by ID:', error);
          throw error;
        }
      }

      static async getCheckOutAmount(id: any) {
        return bookingModel.findOne({ where: { id } });
    }

    static async isAlreadyCheckedIn(bookingId: number): Promise<boolean> {
        try {
          const checkOutEntry = await checkOutServiceModel.findOne({
            where: { booking_id: bookingId }
          });
    
          if (!checkOutEntry) {
            throw new Error('Check-out entry not found');
          }
    
          return checkOutEntry.checkIn_status;
        } catch (error) {
          console.error('Error checking if already checked in:', error);
          throw error;
        }
      }  

      static async createCheckOut(checkin_id, email){
        const checkIn = await checkOutServiceModel.findByPk(checkin_id);
        if(!checkIn){
            throw new Error(responseMessages.checkInDoesNotExist);
        }

        const payment_id = checkIn.payment_id;
        if(payment_id != null){
            throw new Error(responseMessages.paymentAlreadyCompleted);
        }


        const checkout_amount = checkIn.checkout_amount;
        const url = process.env.CHECKOUT_LINK;
        const emailContent = CheckinTemplateClass.checkoutRequest(checkout_amount, url);
  
        await sendStylzedMail(email, checkInConstants.checkoutRequired, emailContent);
      }

      static async acceptCheckOut(checkin_id, payment_id, email){
        const checkIn = await checkOutServiceModel.findByPk(checkin_id);
        if(!checkIn){
            throw new Error(responseMessages.checkInDoesNotExist);
        }
        
        checkIn.payment_id = payment_id;
            try {
                await checkIn.save();
            } catch (error) {
                throw new Error(responseMessages.notSaved)
            }

            const payment_status = PaymentStatus.Accepted;

            const data = {
                checkin_id,
                payment_id,
                payment_status
            } 

            const record = await checkoutRecordModel.create(data)
            
            const emailContent = CheckinTemplateClass.checkoutBill(checkin_id, payment_id);
  
            await sendStylzedMail(email, checkInConstants.checkoutRequired, emailContent);

            return record;
}

static async dcelineCheckOut(checkin_id, payment_id, email){
    const checkIn = await checkOutServiceModel.findByPk(checkin_id);
    if(!checkIn){
        throw new Error(responseMessages.checkInDoesNotExist);
    }
        const payment_status = PaymentStatus.Declined;

        const data = {
            checkin_id,
            payment_id,
            payment_status
        } 

        const record = await checkoutRecordModel.create(data)
        
        const emailContent = CheckinTemplateClass.declineBill(checkin_id, payment_id);

        await sendStylzedMail(email, checkInConstants.checkoutRequired, emailContent);

        return record;
}
}
