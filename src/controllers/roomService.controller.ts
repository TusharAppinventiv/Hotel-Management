import roomModel from "../models/rooms.model";
import { responseMessages, responseStatus } from "../responses/roomService.response";
import { roomServiceClass } from "../services/roomService.service";

export class roomServiceController{
    static async createRoomService(req, res){
        try{
            const data = req.body;

            const roomServiceExists = await roomServiceClass.findServiceByName(data.serviceName);
            console.log(roomServiceExists);
            if(roomServiceExists){
                return res.status(responseStatus.badRequest).json({
                    message: responseMessages.roomServiceExist
                })
            }
            const newServiceData = data;
            const newService = await roomServiceClass.createRoomService(newServiceData);
            return res.status(responseStatus.success).json({
                message: responseMessages.rommServiceCreated, newService
            })
        }catch(error){
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })
        }
    }

    static async getServices(req, res) {
        try {
            const pageNumber = parseInt(req.query.pageNumber) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
    
            const roomService = await roomServiceClass.getRoomServices(pageNumber, pageSize);
            return res.status(responseStatus.success).json(roomService);
        } catch (error) {
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })   
        }
    }

    static async deleteService(req, res){
        const {serviceName} = req.body;
        try{

            const service = await roomServiceClass.removeServicebyName(serviceName);
            if(!serviceName){
                return res.status(responseStatus.notFound).json({
                    message: responseMessages.roomNotExist
                })
            }

            return res.status(responseStatus.success).json({
                message: responseMessages.serviceDeleted
            })
        }catch(error){
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })
        }
    }

    static async orderRoomService(req,res) {
        try {
          const { room_id, service_id, secret_key } = req.body;
    
          const message = await roomServiceClass.orderRoomService(room_id, service_id, secret_key);
    
          return res.status(responseStatus.success).json({
            message,
          });
        } catch (error) {
          console.error(error);
          return res.status(responseStatus.internalServerError).json({
            message: responseMessages.internalServerError,
          });
        }
      }

      static async completeService(req, res) {
        try {
          const { serviceTrackingId } = req.params;
    
          const message = await roomServiceClass.completeService(serviceTrackingId);
    
          return res.status(responseStatus.success).json({
            message,
          });
        } catch (error) {
          console.error(error);
          return res.status(responseStatus.internalServerError).json({
            message: responseMessages.internalServerError,
          });
        }
      }
}

