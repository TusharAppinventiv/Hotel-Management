import { DataTypes,Model } from "sequelize";
import {sequelize} from '../utils/database/database';

interface roomAttributes{
    id: number;
    room_noS: string;
    room_description: string;
    room_size: string;
    room_price: number;
    room_availability: boolean;
}

class roomModel extends Model<roomAttributes> implements roomAttributes{
    public id: number;
    public room_noS: string;
    public room_description: string;
    public room_size: string;
    public room_price: number;
    public room_availability: boolean;
}

roomModel.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    room_noS:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    room_description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    room_size:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    room_price:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_availability:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
},{
    sequelize,
    tableName: 'roomtable'
})


export default roomModel