// import { UserService } from "../services/users.service";
// import { v4 as uuidv4 } from 'uuid';
// import { sendStylzedMail } from "../services/email.service";
// import redisClient from '../utils/redis/redis'
// import { UserConstants } from "../constants/users.constants";
// import { responseMessages, responseStatus } from '../responses/user.response';
// export class UserController{
//     static async signup(req, res) {
//         try {
//             const value = req.body;
            
//             const existingUser = await UserService.findUserByMail(value.email);
//             const existingUser2 = await UserService.findUserByMobNumber(value.mobNumber);

//             if (existingUser) {
//                 return res.status(409).json({ error: 'Email is already registered' });
//             }
//             if (existingUser2) {
//                 return res.status(409).json({ error: 'mobNumber is already registered' });
//             }

//             const hashedPassword = await UserService.hashedPassword(value.password);

//             const confirmationToken = uuidv4();

//             const newUserData = {
//                 ...value,
//                 password: hashedPassword,
//                 session: false,
//                 passwordResetToken: confirmationToken, // Use the passwordResetToken field for confirmation token
//                 isAuthorized: false
//             };

//             const newUser = await UserService.createUser(newUserData);
//             const confirmationLink = `${UserConstants.APP_URL}/user/confirm/${confirmationToken}`;
//             const confirmationSubject = 'Account Confirmation';
//             const confirmationHTML = UserConstants.generateConfirmationEmailTemplate(confirmationLink);
            
//             await sendStylzedMail(value.email, confirmationSubject, confirmationHTML);
            
//             console.log("success");
//             return res.status(201).json({ message: 'Signup Successful. Kindly confirm your account from your email.', user: newUser });

//         } catch (err) {
//             console.error('Error during signup', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//     }

//     static async login(req, res) {
//         try {
//             const value = req.body;

//             const userId = await UserService.findUserEmailAndPassword(
//                 value.email,
//                 value.password
//             );
            
//             if (!userId) {
//                 return res.status(401).json({ error: 'Invalid Credentials' });
//             }
//             const user = await UserService.getUserById(userId); // Fetch user data
//             if(!user.isAuthorized){
//                 res.status(400).json({message: 'User is not authorized'});
//             }
//             await redisClient.set(`status:${value.email}`, 'true');
//             await UserService.updateLoginStatus(userId, true);
    
//             let token;
//             if (user.isAdmin) {
//                 token = await UserService.generateAuthTokenAdmin(userId); // Generate admin token
//             } else {
//                 token = await UserService.generateAuthToken(userId); // Generate regular token
//             }
    
//             return res.status(200).json({ message: 'Login Successful', token });
    
//         } catch (err) {
//             console.error('Error during login: ', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
    
//     static async logout(req, res) {
//         try {
//             const { email } = req.body;
    
//             // Check if the user is logged in
//             const sessionStatus = await redisClient.get(`status:${email}`);
    
//             if (sessionStatus === 'true') {
//                 await redisClient.set(`status:${email}`, 'false'); // Update session status in Redis
//                 const user = await UserService.findUserByMail(email);
    
//                 if (user) {
//                     await UserService.updateLoginStatus(user.id, false); 
//                 }
    
//                 return res.status(200).json({ message: 'Logout successful' });
//             } else {
//                 return res.status(401).json({ error: 'User is not logged in' });
//             }
//         } catch (error) {
//             console.error('Error during logout:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//     }
    
//     static async confirmAccount(req, res) {
//     try {
//         const { confirmationToken } = req.params;

//         // Find the user by the confirmation token
//         const user = await UserService.findUserByConfirmationToken(confirmationToken);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found or confirmation token expired.' });
//         }

//         if (user.isAuthorized) {
//             return res.status(400).json({ error: 'User is already authorized.' });
//         }

//         // Update the user's isAuthorized status to true
//         await UserService.updateUserAuthorization(user);

//         return res.status(200).json({ message: 'Account confirmed successfully.' });

//     } catch (err) {
//         console.error('Error confirming account:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// }

//     static async deleteUser(req, res){
//         const {email} = req.body;
//         try{

//             const user = await UserService.removeUserByEmail(email);
//             if(!email){
//                 return res.status(404).json({ error: 'Email not found'});
//             }

//             return res.status(200).json({message: 'User deleated'});
//         }catch(error){
//             return res.status(500).json({error : 'Internal server error'});
//         }
//     }

//       static async getUsers(req, res) {
//         try {
//             const pageNumber = parseInt(req.query.pageNumber) || 1;
//             const pageSize = parseInt(req.query.pageSize) || 10;
    
//             const rooms = await UserService.getUsers(pageNumber, pageSize);
//             return res.status(200).json(rooms);
//         } catch (error) {
//             console.error('Error fetching rooms: ', error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
// }


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
