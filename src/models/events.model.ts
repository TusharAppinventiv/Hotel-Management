import { DataTypes,DateOnlyDataType,Model } from "sequelize";
import {sequelize} from '../utils/database/database';
import userModel from "./users.model";

interface EventAttributes{
    id: number;
    Event_name: string;
    Event_description: string;
    Event_date: Date;
    Event_dress: string;
}

class EventModel extends Model<EventAttributes> implements EventAttributes{
    public id: number;
    public Event_name: string;
    public Event_description: string;
    public Event_date: Date;
    public Event_dress: string;
}

EventModel.init(
{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    Event_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    Event_description:{
        type: DataTypes.STRING,
        allowNull:false,
    },

    Event_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Event_dress:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    tableName: 'eventable',
});

export default EventModel;