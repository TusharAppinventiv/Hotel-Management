import { EventCreatingService } from "../services/events.service";
import { responseStatus,responseMessages } from "../responses/events.response";

export class EventCreatingController{
    static async createEvent(req, res){
        try{
            const value = req.body;

            const existingEvent = await EventCreatingService.getEventByName(value.Event_name);

            if(existingEvent){
                return res.status(responseStatus.conflict).json({
                    message: responseMessages.alreadyExist
                });
            }

            const newEventData = value;
            
            const newEvent = await EventCreatingService.createEvent(newEventData);

            return res.status(responseStatus.created).json({
                message: responseMessages.eventCreadted, Event: newEvent
            });
        }catch(error){
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })   
        }
    }

    static async getEvents(req, res) {
        try {
            const pageNumber = parseInt(req.query.pageNumber) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
    
            const events = await EventCreatingService.getEvents(pageNumber, pageSize);
            return res.status(200).json(events);
        } catch (error) {
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })   
        }
    }
    static async deleteEvent(req, res){
        const {Event_name} = req.body;
        try{

            const event = await EventCreatingService.removeEventByname(Event_name);
            if(!Event_name){
                return res.status(responseStatus.notFound).json({
                    message: responseMessages.eventNFound
                })
            }

            return res.status(responseStatus.success).json({
                message: responseMessages.eventDeleted
            })
        }catch(error){
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })
        }
    }
}