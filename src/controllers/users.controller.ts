import { UserService } from "../services/users.service";
import { v4 as uuidv4 } from 'uuid';
import { sendStylzedMail } from "../services/email.service";
import redisClient from '../utils/redis/redis'
import { UserConstants } from "../constants/users.constants";
import { UserTemplates } from "../templates/user.confirmation.template";
import { responseMessages, responseStatus } from '../responses/user.response';

export class UserController{
    static async signup(req, res) {
        try {
            const value = req.body;
            
            const existingUser = await UserService.findUserByMail(value.email);
            const existingUser2 = await UserService.findUserByMobNumber(value.mobNumber);

            //If mobile and email already exist
            if (existingUser) {
                return res.status(responseStatus.conflict).json({
                    message: responseMessages.emailError,
                })
            }
            if (existingUser2) {
                return res.status(responseStatus.conflict).json({
                    message: responseMessages.mobError,
                })
            }

            const hashedPassword = await UserService.hashedPassword(value.password);

            const confirmationToken = uuidv4();

            const newUserData = {
                ...value,
                password: hashedPassword,
                session: false,
                passwordResetToken: confirmationToken, // Use the passwordResetToken field for confirmation token
                isAuthorized: false
            };

            const newUser = await UserService.createUser(newUserData);
            const confirmationLink = `${UserConstants.APP_URL}/user/confirm/${confirmationToken}`;
            const confirmationSubject = UserConstants.confirmationSubject;
            const confirmationHTML = UserTemplates.generateConfirmationEmailTemplate(confirmationLink);
            
            await sendStylzedMail(value.email, confirmationSubject, confirmationHTML);
            
            return res.status(responseStatus.success).json({
                message: responseMessages.success,
                user: newUser
            });
        } catch (err) {
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })
        }
    }

    static async login(req, res) {
        try {
            const value = req.body;

            const userId = await UserService.findUserEmailAndPassword(
                value.email,
                value.password
            );
            
            if (!userId) {
                return res.status(responseStatus.unauthorized).json({
                    message: responseMessages.credentials
                });
            }
            
            //checking if user is already authorized or not
            const user = await UserService.getUserById(userId); 
            if(!user.isAuthorized){
                return res.status(responseStatus.conflict).json({
                    message: responseMessages.UserNotAuthorized
                })
            }

            await redisClient.set(`status:${value.email}`, 'true');
            await UserService.updateLoginStatus(userId, true);
    
            let token;
            if (user.isAdmin) {
                token = await UserService.generateAuthTokenAdmin(userId); // Generate admin token
            } else {
                token = await UserService.generateAuthToken(userId); // Generate regular token
            }  if(!user.isAuthorized){
                return res.status(responseStatus.conflict).json({
                    message: responseMessages.UserNotAuthorized
                })
            }
    
            return res.status(responseStatus.success).json({
                message: responseMessages.loginSuccessful,token
            })
    
        } catch (err) {
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError,
            })
        }
        
    }
    
    static async logout(req, res) {
        try {
            const { email } = req.body;
            const sessionStatus = await redisClient.get(`status:${email}`);
    
            if (sessionStatus === 'true') {
                await redisClient.set(`status:${email}`, 'false'); // Update session status in Redis
                const user = await UserService.findUserByMail(email);
    
                if (user) {
                    await UserService.updateLoginStatus(user.id, false); 
                }
    
                   return res.status(responseStatus.success).json({
                    message: responseMessages.logoutSuccessful
                   })
                }
               else {
                    return res.status(responseStatus.unauthorized).json({
                        message: responseMessages.notLoggedIn
                    })
                }
            }
        catch (error) {
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })
        }
    }
    
    static async confirmAccount(req, res) {
    try {
        const { confirmationToken } = req.params;

        const user = await UserService.findUserByConfirmationToken(confirmationToken);

        if (!user) {
            return res.status(responseStatus.notFound).json({
                message: responseMessages.userNotFound
            })
        }

        if (user.isAuthorized) {
            return res.status(responseStatus.badRequest).json({
                message: responseMessages.userAlreadyAuthorized
            })
        }

        // Update the user's isAuthorized status to true
        await UserService.updateUserAuthorization(user);

        return res.status(responseStatus.success).json({
            message: responseMessages.confirmedSuccessfully
        })} 

    catch (err) {
        return res.status(responseStatus.internalServerError).json({
            message: responseMessages.internalServerError
        })
        }
    }

    static async deleteUser(req, res){
        const {email} = req.body;
        try{

            const user = await UserService.removeUserByEmail(email);
            if(!email){
                return res.status(responseStatus.notFound).json({
                    message: responseMessages.emailNotFound
                })
            }

            return res.status(responseStatus.success).json({
                message: responseMessages.userDeleted
            })
        }catch(error){
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })
        }
    }

      static async getUsers(req, res) {
        try {
            const pageNumber = parseInt(req.query.pageNumber) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
    
            const users = await UserService.getUsers(pageNumber, pageSize);
            return res.status(responseStatus.success).json({
                users
            })
        } catch (error) {
            return res.status(responseStatus.internalServerError).json({
                message: responseMessages.internalServerError
            })
        }
    }
}
