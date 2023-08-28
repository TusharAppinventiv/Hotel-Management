import { roomCreatingService } from "../services/rooms.service";
import { sendStylzedMail } from "../services/email.service";
import { UserService } from "../services/users.service";
import PaymentStatus from "../constants/enum";
import { responseMessages,responseStatus } from "../responses/booking.response";
import { BookingConstants } from "../constants/booking.constants";
import {BookingTemplateClass} from '../templates/booking.templates'
import bookingModel from "../models/booking.model";
import roomModel from "../models/rooms.model";
import { Op } from 'sequelize'; 

class BookingController {
    static async createBooking(req, res) {
        try {
            const data = req.body;
        
            const userExists = await UserService.checkUserExistence(data.user_id);
            if (!userExists) {
                return res.status(responseStatus.badRequest).json({
                    message: responseMessages.userNotExist
                })
            }
    
            // Check if room_id exists in the database
            const roomExists = await roomCreatingService.checkRoomExistence(data.room_id);
            if (!roomExists) {
                return res.status(responseStatus.badRequest).json({
                    message: responseMessages.roomNotExist
                })
            }
            // Check room availability
            const room = await roomCreatingService.checkAvailability(data.room_id, data.checkin_date, data.checkout_date);
    
            if (!room) {
                return res.status(responseStatus.badRequest).json({
                    message: responseMessages.roomNotAvailable
                })
            }
    
            const bookingDuration = Math.ceil(
                (new Date(data.checkout_date).getTime() - new Date(data.checkin_date).getTime()) / (1000 * 60 * 60 * 24)
            );
            
            const booking_date = new Date();
            // Get the room's cost from the database based on room_id
            const roomCost = await roomCreatingService.getRoomCost(data.room_id);
            
            const roomset = await roomCreatingService.updateRoomAvailability(data.room_id, true);
            
            const checkoutAmount = bookingDuration * roomCost;
            const user = await UserService.getUserById(data.user_id);
            const userEmail = user.email;
            const booking = await roomCreatingService.createBooking({
                ...data,
                booking_date, 
                booking_amount: 1000,
                checkout_amount: checkoutAmount,
                payment_status: false
            });
            const emailSubject = BookingConstants.emailSubject;
            const bookingURL = BookingConstants.bookingURL;
            const emailHTML = BookingTemplateClass.generateBookingEmailTemplate(booking.id, booking.room_id, booking.booking_amount, checkoutAmount, BookingConstants.book_url);
            
            await sendStylzedMail(userEmail, emailSubject, emailHTML);
            return res.status(responseStatus.created).json({ message: 
                booking,
                bookingURL,
                });
        } catch (error) {
            console.log(error);
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })        
        }
    }
    static async acceptBooking(req, res) {
        try {

            const data = req.body;
            
            const booking = await roomCreatingService.getBookingById(data.booking_id);
            
            if (!booking) {
                return res.status(responseStatus.notFound).json({ 
                    message: responseMessages.bookingNotFound });
            }
            
            booking.payment_status = true;
            booking.payment_id = data.payment_id;
            try {
                await booking.save();
            } catch (error) {
                return res.status(responseStatus.internalServerError).json({ 
                    message: responseMessages.bookingNotStored
                });
            }

            const record = await roomCreatingService.createRecord({
                ...data,
                payment_status: PaymentStatus.Accepted
            });

            const user = await UserService.getUserById(booking.user_id);
            
            if (!user) {
                return res.status(responseStatus.notFound).json({ 
                    message: responseMessages.userNotFound
                });
            }
            
            const ownerEmail = user.email;             

            const billSubject = BookingConstants.billSubject;
            const billHTML = BookingTemplateClass.generateBill(booking.payment_id, booking.booking_amount);
            await sendStylzedMail(ownerEmail, billSubject, billHTML);
    
            return res.status(responseStatus.success).json({ 
                message: responseMessages.bookingSuccess, record 
            });
        } catch (error) {
            console.log(error);
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })}
    }
    
    static async denyBooking(req, res) {
        try {
            const data = req.body;

            const booking = await roomCreatingService.getBookingById(data.booking_id);

            if (!booking) {
                return res.status(responseStatus.notFound).json({
                    message: responseMessages.bookingNotFound
                });
            }

            booking.payment_status = false; 
            booking.payment_id = data.payment_id;
            try {
                await booking.save();
            } catch (error) {
                return res.status(responseStatus.internalServerError).json({
                    message: responseMessages.bookingNotStored
                });
            }

            const record = await roomCreatingService.createRecord({
                ...data,
                payment_status: PaymentStatus.Declined
            });

            const user = await UserService.getUserById(booking.user_id);

            if (!user) {
                return res.status(responseStatus.notFound).json({
                    message: responseMessages.userNotFound
                });
            }

            const ownerEmail = user.email;

            const denialSubject = BookingConstants.denialSubject;
            const denialHTML = BookingTemplateClass.generateDenialEmailTemplate(booking.payment_id, booking.booking_amount); // Generate denial email template
            await sendStylzedMail(ownerEmail, denialSubject, denialHTML);

            return res.status(responseStatus.success).json({
                message: responseMessages.bookingDeniedSuccess,record
            });
        } catch (error) {
            console.log(error);
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            });
        }
    }

    static async getAvailableRooms(req, res) {
        const { checkinDate, checkoutDate } = req.query;
    
        try {
            // Find booked room IDs for the requested date range
            const bookedRoomIds = await bookingModel.findAll({
                attributes: ['room_id'],
                where: {
                    checkin_date: { [Op.lte]: checkoutDate },
                    checkout_date: { [Op.gte]: checkinDate }
                }
            });
    
            // Find available rooms that are not booked during the requested date range
            const availableRooms = await roomModel.findAll({
                where: {
                    room_availability: true,
                    id: {
                        [Op.notIn]: bookedRoomIds.map(booking => booking.room_id)
                    }
                }
            });
    
            const availableRoomIds = availableRooms.map(room => room.id);
    
            res.status(200).json({ availableRoomIds });
        } catch (error) {
            console.error(error);
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            });
        }
    }
}

export default BookingController;
