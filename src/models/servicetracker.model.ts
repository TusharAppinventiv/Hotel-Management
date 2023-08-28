import { DataTypes,Model } from "sequelize";
import { sequelize } from "../utils/database/database";
import bookingModel from "./booking.model";


interface serviceTrackingAttributes{
    id: number;
    room_id: number;
    service_id: number;
    completion_status: boolean;
}

class serviceTrackingModel extends Model<serviceTrackingAttributes> implements serviceTrackingAttributes{
    public id: number;
    public room_id: number;
    public service_id: number;
    public completion_status: boolean;
}

serviceTrackingModel.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    room_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    completion_status:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
},{
    sequelize,
    tableName: 'servicetracking'
})

export default serviceTrackingModel;
