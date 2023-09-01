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
import checkInQueries from "../entities/checkIn.entities";

export class CheckinService {
  static async createCheckIn(checkinData) {
     return checkInQueries.createCheckIn(checkinData); 
    }

    static async getBookingById(bookingId) {
        try {
            const booking = await checkInQueries.getBookingById(bookingId); 
            return booking;
        } catch (error) {
            console.error("Error fetching booking by ID:", error);
            throw new Error("Error fetching booking by ID");
        }
    }

    static async getRoomById(roomId) {
        try {
          const room = await checkInQueries.getRoomById(roomId); 
          return room;
        } catch (error) {
          console.error('Error getting room by ID:', error);
          throw error;
        }
      }
    
      static async getUserById(userId) {
        try {
          const user = await checkInQueries.getUserById(userId);
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
          // If checkOutEntry is not found, return false (not checked in)
          return false;
        }
  
        // Return the checkIn_status value (true if checked in, false if not)
        return checkOutEntry.checkIn_status;
      } catch (error) {
        console.error('Error checking if already checked in:', error);
        throw error;
      }
  }
  

      static async isPaymentPaid(bookingId) {
        console.log("Debug: bookingId =", bookingId); 
        const booking = await bookingModel.findByPk(bookingId);

        if (!booking) {
            throw new Error(responseMessages.bookingIdNotExist);
        }

        if (!booking.payment_status) {
            throw new Error(responseMessages.notPaid);
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
