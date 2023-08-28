import {DataTypes,Model} from 'sequelize'
import {sequelize} from '../utils/database/database'

interface userAttributes{
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mobNumber: string;
    isAdmin: boolean;
    isAuthorized: boolean;
    passwordResetToken: string;
    session: boolean;
}

class userModel extends Model<userAttributes> implements userAttributes{
    public id: number;
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public mobNumber: string;
    public isAdmin: boolean;
    public isAuthorized: boolean;
    public passwordResetToken: string;
    public session: boolean;
}

userModel.init(
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobNumber:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    isAuthorized:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    passwordResetToken:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    session:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }

},{
    sequelize,
    tableName: 'usertable'

})

export default userModel;