import { DataTypes,Model } from "sequelize";
import {sequelize} from '../utils/database/database';
import PaymentStatus from '../constants/enum'

interface RecordAttributes{
    id: number;
    checkin_id: number;
    payment_id: string;
    payment_status: PaymentStatus;
}

class checkoutRecordModel extends Model<RecordAttributes> implements RecordAttributes{
    public id: number;
    public checkin_id: number;
    public payment_id: string;
    public payment_status: PaymentStatus;
}

checkoutRecordModel.init(
{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    checkin_id:{
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
    tableName: 'checkoutrecord',
});

export default checkoutRecordModel