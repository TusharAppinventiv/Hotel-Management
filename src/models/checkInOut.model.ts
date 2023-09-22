import { DataTypes,Model } from "sequelize";
import { sequelize } from "../utils/database/database";
import bookingModel from "./booking.model";

interface checkOutServiceAttributes{
    id: number;
    booking_id: number;
    checkout_amount: number;
    secret_key: string;
    checkIn_status: boolean;
    payment_id: string;
}

class checkOutServiceModel extends Model<checkOutServiceAttributes> implements checkOutServiceAttributes{
    public id: number;
    public booking_id: number;
    public checkout_amount: number;
    public secret_key: string;
    public checkIn_status: boolean;
    public payment_id: string;
}

checkOutServiceModel.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    booking_id:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: bookingModel,
          key: 'id',
        },
    },
    checkout_amount:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    secret_key:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    checkIn_status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    payment_id:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    sequelize,
    tableName: 'checkoutable'
})

checkOutServiceModel.belongsTo(bookingModel, {foreignKey: 'booking_id', as: 'booking'});

export default checkOutServiceModel;
