import { DataTypes,Model } from "sequelize";
import { sequelize } from "../utils/database/database";
import roomModel from "./rooms.model";
import userModel from "./users.model";

interface roomServiceAttributes{
    id: number;
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
}

class roomServiceModel extends Model<roomServiceAttributes> implements roomServiceAttributes{
    public id: number;
    public serviceName: string;
    public serviceDescription: string;
    public servicePrice: number;
}

roomServiceModel.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    serviceName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    serviceDescription:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    servicePrice:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize,
    tableName: 'roomservicetable'
})

export default roomServiceModel;
