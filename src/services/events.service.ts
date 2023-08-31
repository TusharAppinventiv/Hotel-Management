// EventService.ts
import cron from 'node-cron';
import userModel from '../models/users.model';
import { sendStylzedMail } from './email.service';
import { eventTemplateClass } from '../templates/event.template';
import  EventQueries from '../entities/event.entities'; 

export class EventCreatingService {

    static async getEventByName(Event_name) {
        return EventQueries.getEventByName(Event_name);
    }

    static async createEvent(eventData) {
        return EventQueries.createEvent(eventData);
    }

    static async removeEventByname(Event_name) {
        return EventQueries.removeEventByname(Event_name);
    }

    static async checkEventExistance(eventId) {
        return EventQueries.checkEventExistance(eventId);
    }

    static async getEvents(page: number, pageSize: number) {
        return EventQueries.getEvents(page, pageSize);
    }

    static async startEventReminderCron() {
        // cron.schedule('*/30 * * * * *', async () => {
        cron.schedule('0 8 * * *', async () => {
            console.log('Running event reminder cron job...');

            try {
                const overdueEvents = await EventQueries.getEventsInNextWeek();

                for (const event of overdueEvents) {
                    const users = await userModel.findAll();
                    const emailText = eventTemplateClass.makeEvent(event);
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