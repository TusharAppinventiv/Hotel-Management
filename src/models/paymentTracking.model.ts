import { DataTypes,Model } from "sequelize";
import {sequelize} from '../utils/database/database';
import PaymentStatus from '../constants/enum'

interface RecordAttributes{
    id: number;
    booking_id: number;
    payment_id: string;
    payment_status: PaymentStatus;
}

class RecordModel extends Model<RecordAttributes> implements RecordAttributes{
    public id: number;
    public booking_id: number;
    public payment_id: string;
    public payment_status: PaymentStatus;
}

RecordModel.init(
{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    booking_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    payment_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    payment_status:{
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        allowNull:false,
    },
},
{
    sequelize,
    tableName: 'paymentrecord',
});

export default RecordModel