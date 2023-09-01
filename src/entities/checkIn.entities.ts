import bookingModel from "../models/booking.model";
import checkOutServiceModel from "../models/checkInOut.model";
import roomModel from "../models/rooms.model";
import userModel from "../models/users.model";

export default class checkInQueries {
    static async getRoomByName(room_noS) {
        return roomModel.findOne({ where: { room_noS } });
    }

    static async getBookingById(bookingId){
        return bookingModel.findByPk(bookingId); 
    }

    static async createCheckIn(checkinData) {
        return checkOutServiceModel.create(checkinData);
    }

    static async getRoomById(id: number) {
        return roomModel.findOne({ where: { id } });
    }

    static async getUserById(id: number){
        return userModel.findOne({ where: { id } });
    }
}

