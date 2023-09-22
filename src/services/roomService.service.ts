import roomServiceModel from "../models/roomService.model";
import serviceTrackingModel from "../models/servicetracker.model";
import checkOutServiceModel from "../models/checkInOut.model";
import roomModel from "../models/rooms.model";
import { responseMessages } from "../responses/roomService.response";
import { sendStylzedMail } from "./email.service";
import { serviceTemplateCLass } from "../templates/Service.template";
import { checkInConstants } from "../constants/checkIn.constants";

export class roomServiceClass{
    static async getroomServiceByID(serviceName){
        return roomServiceModel.findOne({where: {serviceName}});
    }

    static async createRoomService(serviceData){
        return roomServiceModel.create(serviceData);
    }

    static async removeServicebyName(serviceName){
        return roomServiceModel.destroy({ where: {serviceName} } );
    }

    static async getRoomServices(page: number, pageSize: number){
        const offset = (page - 1) * pageSize;

        const roomServices = await roomServiceModel.findAll({
            limit: pageSize,
            offset: offset,
    });
    return roomServices;

    }

    static async findServiceByName(serviceName) {
        return roomServiceModel.findOne({where: {serviceName}});
}

static async orderRoomService(room_id: number, service_id: number, secret_key: string) {
    try {
      const existingRoomService = await serviceTrackingModel.findOne({
        where: { room_id, service_id, completion_status: false },
      });

      if (existingRoomService) {
        throw new Error(responseMessages.serviceAlreadyOrdered);
      }

      const service = await roomServiceModel.findByPk(service_id);
      if (!service) {
        throw new Error(responseMessages.serviceNotFound);
      }
      const service_name = service.serviceName;
      const room = await roomModel.findByPk(room_id);
      if(!room){
        throw new Error(responseMessages.roomNotExist)}


      const roomNos = room.room_noS; 
      const checkout = await checkOutServiceModel.findOne({
        where: { secret_key, checkIn_status: true },
      });

      if (!checkout) {
        throw new Error(responseMessages.bookingNotFound);
      }

      await serviceTrackingModel.create({
        room_id,
        service_id,
        completion_status: false,
      });

      const serviceAdmin = process.env.SERVICE_ADMIN;
      const updatedCheckoutAmount = checkout.checkout_amount + service.servicePrice;
      const emailContent = serviceTemplateCLass.requestService(roomNos, service_name);

      await sendStylzedMail(serviceAdmin, checkInConstants.serviceRequired, emailContent);
      await checkOutServiceModel.update(
        { checkout_amount: updatedCheckoutAmount },
        { where: { id: checkout.id } }
      );

      return responseMessages.serviceOrdered;
    } catch (error) {
      throw error;
    }
  }

  static async completeService(serviceTrackingId: string): Promise<string> {
    try {
      const serviceTracking = await serviceTrackingModel.findByPk(serviceTrackingId);
      if (!serviceTracking) {
        throw new Error(responseMessages.serviceTrackingNotFound);
      }

      await serviceTracking.update({ completion_status: true });

      return responseMessages.serviceCompletion;
    } catch (error) {
      throw error;
    }
  }
}