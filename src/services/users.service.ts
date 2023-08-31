// UserService.ts
import * as userQueries from '../entities/user.entities';

export class UserService {
    static async getUserById(id: any) {
        return userQueries.getUserById(id);
    }

    static async checkUserExistence(userId) {
        return userQueries.checkUserExistence(userId);
    }

    static async getUserByEmail(email) {
        return userQueries.getUserByEmail(email);
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
}
