// userQueries.ts
import userModel from '../models/users.model';
import { responseMessages } from '../responses/user.response';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function getUserById(id: any) {
    return userModel.findOne({ where: { id } });
}

export async function getUserBYPk(id) {
    return userModel.findByPk(id);
}
export async function getUserByEmail(email) {
    return userModel.findOne({ where: { email } });
}
export async function findUserByPasswordResetToken(token: string) {

    try {
      const user = await userModel.findOne({
        where: {
          passwordResetToken: token,
        },
      });
  
      return user;
    } catch (error) {
      throw error;
    }
}

  export async function updatePassword(user, newPassword: string) {
    user.password = newPassword;
    user.passwordResetToken = '';

    await user.save();
  }

export async function checkUserExistence(userId) {
    try {
        const user = await userModel.findByPk(userId);
        return user !== null;
    } catch (error) {
        console.error("Error checking user existence:", error);
        throw error;
    }
}

export async function updateLoginStatus(userId, status) {
    const user = await userModel.findByPk(userId);

    if (!user) {
        throw new Error(responseMessages.userNotFound);
    }

    user.session = status;
    await user.save();
}

export async function getUsers(offset: number, pageSize: number) {
    const users = await userModel.findAll({
        limit: pageSize,
        offset: offset,
    });
    return users;
}

export async function findUserByMail(email) {
    try {
        const user = await userModel.findOne({ where: { email } });
        return user;
    } catch (error) {
        throw new Error(responseMessages.userNotFound);
    }
}

export async function  updatePasswordResetToken(user, token: string) {
    user.passwordResetToken = token;
    await user.save();
  }

export async function findUserByMobNumber(mobNumber) {
    return userModel.findOne({ where: { mobNumber } });
}

export async function findUserByConfirmationToken(confirmationToken: string) {
    return userModel.findOne({ where: { passwordResetToken: confirmationToken } });
}

export async function createUser(userData) {
    return userModel.create(userData);
}

export async function removeUserByEmail(email){
    return userModel.destroy({ where: {email} });
}

export async function updateUserAuthorization(user) {
    user.isAuthorized = true;
    await user.save();
}


export async function hashedPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export async function generateAuthToken(userId) {
    const token = jwt.sign({ id: userId }, process.env.USER_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
    return token;
}

export async function generateAuthTokenAdmin(userId) {
    const token = jwt.sign({ id: userId }, process.env.ADMIN_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
    return token;
}

export async function findUserEmailAndPassword(email, password) {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    const userId = isPasswordValid ? user.id : null;

    return userId;
}