// import { roomValidator } from "../middlewares/roomValidator";
// import { roomCreatingService } from "../services/rooms.service";

// export class RoomCreatingController{
//     static async createRoom(req, res){
//         try{
//             const value = req.body;

//             const existingRoom = await roomCreatingService.getRoomByName(value.room_noS);

//             if(existingRoom){
//                 return res.status(409).json({error: 'Room already exists'});
//             }

//             const newRoomData = {
//                 ...value,
//                 room_availability: true
//             }

//             const newRoom = await roomCreatingService.createRoom(newRoomData);
//             return res.status(201).json({message: 'Room Created', room: newRoomData})
//         }catch(error){
//             console.log('Error during room creation: ', error);
//             return res.status(500).json({error: 'Internal server error'});
//         }
//     }

//     static async getRooms(req, res) {
//         try {
//             const pageNumber = parseInt(req.query.pageNumber) || 1;
//             const pageSize = parseInt(req.query.pageSize) || 10;
    
//             const rooms = await roomCreatingService.getRooms(pageNumber, pageSize);
//             return res.status(200).json(rooms);
//         } catch (error) {
//             console.error('Error fetching rooms: ', error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
    
// }
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
    
}