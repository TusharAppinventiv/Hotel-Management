import bookingModel from "../models/booking.model";
import roomModel from "../models/rooms.model";
import RecordModel from "../models/paymentTracking.model";
import { responseMessages,responseStatus } from "../responses/booking.response";
import dotenv from 'dotenv';
import { Op } from 'sequelize'; 

dotenv.config();

export class roomCreatingService{
    static getRoomByName(room_noS){
        return roomModel.findOne({where: {room_noS}});
    }

    static async createRoom(roomData){
        return roomModel.create(roomData);
    }

    static async getRoomById(id: any) {
        return roomModel.findOne({ where: { id } });
    }

    static async checkRoomExistence(roomId) {
        try {
          const room = await roomModel.findByPk(roomId); 
          return room !== null;
        } catch (error) {
          console.error("Error checking room existence:", error);
          throw error;
        }
    }


    static async getRoomCost(roomId) {
        try {
            const room = await roomModel.findByPk(roomId); // Replace RoomModel with your actual model
            if (!room) {
                throw new Error("Room not found");
            }

            return room.room_price; // Assuming the room has a 'cost' property
        } catch (error) {
            console.error("Error getting room cost:", error);
            throw new Error("Error getting room cost");
        }
    }

    static async getRooms(page: number, pageSize: number){
        const offset = (page - 1) * pageSize;

        const rooms = await roomModel.findAll({
            limit: pageSize,
            offset: offset,
    });
    return rooms;

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
    
    static async checkAvailability(roomId, checkinDate, checkoutDate) {
        const room = await roomModel.findByPk(roomId);
    
        if (!room) {
            throw new Error('Room not found');
        }
    
        if (!room.room_availability) {
            throw new Error('Room is already currently on service');
        }
    
    const existingBookings = await bookingModel.findAll({
            where: {
                room_id: roomId,
                checkin_date: { [Op.lte]: checkoutDate },
                checkout_date: { [Op.gte]: checkinDate }
            }
        });
    
        if (existingBookings.length > 0) {
            throw new Error('Room is not available during the requested dates');
        }
    
        return room;
    }
    

    static async markRoomOccupied(roomId) {
        try {
            const room = await roomModel.findByPk(roomId);
            if (!room) {
                throw new Error('Room not found');
            }
            await room.update({ room_availability: false });
        } catch (error) {
            throw error;
        }
    }

    static async createBooking(data) {
        try {
            const booking = await bookingModel.create(data);
            return booking;
        } catch (error) {
            throw error;
        }
    }
    static async createRecord(data) {
        try {
            const booking = await RecordModel.create(data);
            return booking;
        } catch (error) {
            throw error;
        }
    }

    static async updateRoomAvailability(roomId, availability) {
        try {
            const room = await roomModel.findByPk(roomId);
            
            if (!room) {
                throw new Error("Room not found");
            }

            room.room_availability = availability;
            await room.save();

            return room;
        } catch (error) {
            throw error;
        }
    }

    static async updateBookingPaymentStatus(bookingId: number, options: { payment_status: boolean, payment_id: string }) {
        try {
            const booking = await bookingModel.findByPk(bookingId);

            if (!booking) {
                throw new Error("Booking not found");
            }

            booking.payment_status = options.payment_status;
            booking.payment_id = options.payment_id;
            await booking.save();

            console.log(`Booking ${bookingId} payment status and payment ID updated successfully`);
        } catch (error) {
            console.error("Error updating booking payment status:", error);
            throw error;
        }
    }
}

  // static async checkAvailability(roomId) {
    //     try {
    //         const room = await roomModel.findByPk(roomId);
    //         if (!room) {
    //             throw new Error('Room not found');
    //         }
    //         if (!room.room_availability) {
    //             throw new Error('Room is already occupied');
    //         }
    //         return room;
    //     } catch (error) {
    //         throw error;
    //     }
    // }