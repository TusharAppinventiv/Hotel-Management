import { DataTypes, Model } from "sequelize"
import { sequelize } from "../utils/database/database"
import userModel from "./users.model";
import roomModel from "./rooms.model";

interface bookingAttributes{
    id: number;
    user_id: number;
    room_id: number;
    booking_date: Date;
    checkin_date: Date;
    checkout_date: Date;
    booking_amount: number;
    checkout_amount: number;
    payment_status: boolean;
    payment_id: string;
}

class bookingModel extends Model<bookingAttributes> implements bookingAttributes{
    public id: number;
    public user_id: number;
    public room_id: number;
    public booking_date: Date;
    public checkin_date: Date;
    public checkout_date: Date;
    public booking_amount: number;
    public checkout_amount: number;
    public payment_status: boolean;
    public payment_id: string;
}

bookingModel.init(
{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: userModel,
          key: 'id',
        },
    },
    room_id:{
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: roomModel,
        key: 'id',
       },
    },
    booking_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    checkin_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    checkout_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    booking_amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    checkout_amount:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    payment_status:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    payment_id:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    sequelize,
    tableName: 'bookingtable'
})


bookingModel.belongsTo(userModel, { foreignKey: 'user_id', as: 'user' }); 
bookingModel.belongsTo(roomModel, { foreignKey: 'room_id', as: 'room' });

export default bookingModel;