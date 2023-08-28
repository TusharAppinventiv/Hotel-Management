import bcrypt from 'bcrypt';
import userModel from '../models/users.model';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { responseMessages } from '../responses/user.response';

dotenv.config();

export class UserService {
    static async getUserById(id: any) {
        return userModel.findOne({ where: { id } });
    }

    static async checkUserExistence(userId) {
        try {
          const user = await userModel.findByPk(userId); 
          return user !== null;
        } catch (error) {
          console.error("Error checking user existence:", error);
          throw error;
        }
      }

    static async getUserByEmail(email) {
        return userModel.findOne({ where: { email } });
    }

    static async createUser(userData) {
        return userModel.create(userData);
    }

    static async findUserByMail(email) {
        try {
            const user = await userModel.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw new Error(responseMessages.userNotFound);
        }
    }
    

    static async findUserByMobNumber(mobNumber) {
        return userModel.findOne({ where: { mobNumber } });
    }

    static async removeUserByEmail(email){
        return userModel.destroy({ where: {email} } );
    }

    static async hashedPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    static async generateAuthToken(userId) {
        const token = jwt.sign({ id: userId }, process.env.USER_KEY, {
            expiresIn: process.env.EXPIRES_IN,
        });
        return token;
    }

    static async generateAuthTokenAdmin(userId) {
        const token = jwt.sign({ id: userId }, process.env.ADMIN_KEY, {
            expiresIn: process.env.EXPIRES_IN,
        });
        return token;
    }
   
    static async findUserEmailAndPassword(email, password) {
        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        const userId = isPasswordValid ? user.id : null;

        return userId;
    }

    static async updateLoginStatus(userId, status) {
        const user = await userModel.findByPk(userId);

        if (!user) {
            throw new Error(responseMessages.userNotFound)
        }

        user.session = status;
        await user.save();
    }


    static async findUserByConfirmationToken(confirmationToken: string) {
        return userModel.findOne({ where: { passwordResetToken: confirmationToken } });
    }
    
    static async updateUserAuthorization(user) {
        user.isAuthorized = true;
        await user.save();
    }
    

    static async getUsers(page: number, pageSize: number){
        const offset = (page - 1) * pageSize;

        const rooms = await userModel.findAll({
            limit: pageSize,
            offset: offset,
    });
    return rooms;

    }
}
