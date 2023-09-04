import { roomCreatingService } from "../services/rooms.service";
import { responseMessages, responseStatus } from "../responses/rooms.response";

export class RoomCreatingController{
    static async createRoom(req, res){
        try{
            const value = req.body;

            const existingRoom = await roomCreatingService.getRoomByName(value.room_noS);

            if(existingRoom){
                return res.status(responseStatus.conflict).json({
                    message: responseMessages.alreadyExist
                })   
            }

            const newRoomData = {
                ...value,
                room_availability: true
            }

            const newRoom = await roomCreatingService.createRoom(newRoomData);
            return res.status(201).json({message: 'Room Created', room: newRoomData})
        }catch(error){
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })   
        }
    }

    static async getRooms(req, res) {
        try {
            const pageNumber = parseInt(req.query.pageNumber) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
    
            const rooms = await roomCreatingService.getRooms(pageNumber, pageSize);
            return res.status(responseStatus.success).json(rooms);
        } catch (error) {
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })   
        }
    }

    static async setRoomAvailabilityToTrue(req, res) {
        try {
          const { roomId } = req.params;
          await roomCreatingService.setRoomAvailability(roomId, true);
            res.status(responseStatus.success).json({
                message: responseMessages.roomAvailabilityTrue
            })
        } catch (error) {
          console.error(error);
          return res.status(responseStatus.internalServerError).json({
            message: responseMessages.internalServerError
        })   
        }
      }
    
    static async setRoomAvailabilityToFalse(req, res) {
        try {
          const { roomId } = req.params;
          await roomCreatingService.setRoomAvailability(roomId, false);
          res.status(responseStatus.success).json({
            message: responseMessages.roomAvailabilityFalse
        })
        } catch (error) {
          console.error(error);
          return res.status(responseStatus.internalServerError).json({
            message: responseMessages.internalServerError
        })   
        }
      }
    
}