import EventModel from '../models/events.model'
import cron from 'node-cron';
import { Op } from 'sequelize'; 
import userModel from '../models/users.model';
import { sendStylzedMail } from './email.service'; 
import { eventTemplateClass } from '../templates/event.template';

export class EventCreatingService{
    static async getEventByName(Event_name){
        return EventModel.findOne({where: {Event_name}});
    }

    static async createEvent(eventData){
        return EventModel.create(eventData);
    }
    
    static async removeEventByname(Event_name){
        return EventModel.destroy({ where: {Event_name} } );
    }

    static async checkEventExistance(eventId){
        try{
            const event = await EventModel.findByPk(eventId);
            return event !== null;
        }catch(error){
            console.error("Error checking event existance: ", error);
            throw error;
        }
    }

    static async getEvents(page: number, pageSize: number){
        const offset = (page - 1) * pageSize;

        const users = await EventModel.findAll({
            limit: pageSize,
            offset: offset,
    });
    return users;

    }

    static async startEventReminderCron() {
        // cron.schedule('*/30 * * * * *', async () => {
        cron.schedule('0 8 * * *', async () => {
            console.log('Running event reminder cron job...');
    
            try {
                const overdueEvents = await EventModel.findAll({
                    where: {
                        Event_date: {
                            [Op.between]: [
                                new Date(),
                                new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // One week in the future
                            ],
                        },
                    },
                });                

            for (const event of overdueEvents) {
                // Fetch user emails from the User model
                const users = await userModel.findAll();
                // Generate the email template using the modified class
                const emailText = eventTemplateClass.makeEvent(event);
                // Send emails to all users
                for (const user of users) {
                    await sendStylzedMail(user.email, 'Invitation', emailText);
                    console.log("email sent successfully");
                }
            }
    
            console.log('Event reminder cron job completed.');
            } catch (error) {
                console.error('Error sending event reminders:', error);
            }
        });
}
}