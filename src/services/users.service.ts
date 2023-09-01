// UserService.ts
import * as userQueries from '../entities/user.entities';
import userModel from '../models/users.model';
import { responseMessages } from '../responses/user.response';

export class UserService {
    static async getUserById(id: any) {
        return userQueries.getUserById(id);
    }

    static async checkUserExistence(userId) {
        return userQueries.checkUserExistence(userId);
    }

    static async findUserToken(token){
        userModel.findOne(token);
    }

    static async getUserByEmail(email) {
        return userModel.findOne(email);
    }

    static async createUser(userData) {
        return userQueries.createUser(userData);
    }

    static async findUserByMail(email) {
        return userQueries.findUserByMail(email);
    }

    static async findUserByMobNumber(mobNumber) {
        return userQueries.findUserByMobNumber(mobNumber);
    }

    static async removeUserByEmail(email) {
        return userQueries.removeUserByEmail(email);
    }

    static async hashedPassword(password) {
        return userQueries.hashedPassword(password);
    }

    static async generateAuthToken(userId) {
        return userQueries.generateAuthToken(userId);
    }

    static async generateAuthTokenAdmin(userId) {
        return userQueries.generateAuthTokenAdmin(userId);
    }

    static async findUserEmailAndPassword(email, password) {
        return userQueries.findUserEmailAndPassword(email, password);
    }

    static async updateLoginStatus(userId, status) {
        return userQueries.updateLoginStatus(userId, status);
    }

    static async findUserByConfirmationToken(confirmationToken: string) {
        return userQueries.findUserByConfirmationToken(confirmationToken);
    }

    static async updateUserAuthorization(user) {
        return userQueries.updateUserAuthorization(user);
    }

    static async getUsers(page: number, pageSize: number) {
        const offset = (page - 1) * pageSize;
        return userQueries.getUsers(offset, pageSize);
    }

    static async deactivateUser(userId: number) {
        try {
          const user = await userQueries.getUserBYPk(userId);
    
          if (!user) {
            throw new Error(responseMessages.userNotFound);
          }
    
          user.isAuthorized = false;
          user.passwordResetToken = '';
    
          await user.save();
        } catch (error) {
          throw error;
        }
      }

      static async updateUser( updatedData: any) {
        try {
          const user = await userQueries.getUserBYPk(updatedData.id);
    
          if (!user) {
            throw new Error(responseMessages.userNotFound);
          }
    
          user.firstName = updatedData.firstName 
          user.lastName = updatedData.lastName 
          user.mobNumber = updatedData.mobNumber 
    
          await user.save();
        } catch (error) {
          throw error;
        }
}

static async savePasswordResetToken(email: string, token: string) {
  try {
    const user = await userQueries.findUserByMail(email);

    if (user) {
      await userQueries.updatePasswordResetToken(user, token);
    }
  } catch (error) {
    throw error;
  }
}

  static async resetPassword(token: string, newPassword: string) {
    try {
      const user = await userQueries.findUserByPasswordResetToken(token);

      if (!user) {
        throw new Error(responseMessages.tokenNAN);
      }

      // Hash the new password before updating it
      const hashedPassword = await userQueries.hashedPassword(newPassword);

      await userQueries.updatePassword(user, hashedPassword);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
