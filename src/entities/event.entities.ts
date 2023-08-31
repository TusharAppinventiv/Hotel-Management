// EventQueries.ts
import EventModel from '../models/events.model';
import { Op } from 'sequelize';

export default class EventQueries{
static async getEventByName(Event_name) {
    return EventModel.findOne({ where: { Event_name } });
}

static async createEvent(eventData) {
    return EventModel.create(eventData);
}

static async removeEventByname(Event_name) {
    return EventModel.destroy({ where: { Event_name } });
}

static async checkEventExistance(eventId) {
    try {
        const event = await EventModel.findByPk(eventId);
        return event !== null;
    } catch (error) {
        console.error("Error checking event existence: ", error);
        throw error;
    }
}

static async getEventsInNextWeek() {
    return EventModel.findAll({
        where: {
            Event_date: {
                [Op.between]: [
                    new Date(),
                    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // One week in the future
                ],
            },
        },
    });
}

static async getEvents(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    return EventModel.findAll({
        limit: pageSize,
        offset: offset,
    });
}
}