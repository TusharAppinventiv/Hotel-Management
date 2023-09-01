import express from 'express';
import { UserController } from '../controllers/users.controller';
import { verifyUser } from '../middlewares/users.auth';
import { verifyAdmin } from '../middlewares/admin.auth';
import { signupValidator,loginValidator, updateUserDataValidator, tokenAndPasswordValidationMiddleware } from '../middlewares/validator';
import { verifyAdminOrUser } from '../middlewares/verifyAdminOrUser';
const router = express.Router();

router.post('/signup', signupValidator, UserController.signup);
router.post('/login',loginValidator, UserController.login);
router.post('/logout', UserController.logout);
router.get('/protected-resource', verifyUser, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected resource.' });
  });
router.get('/confirm/:confirmationToken', UserController.confirmAccount);
router.delete('/delete', verifyAdmin, UserController.deleteUser);
router.get('/getUsers', verifyAdmin, UserController.getUsers);
router.put('/:id/deactivate', verifyAdmin, UserController.deactivateUser);
router.put('/update',verifyAdminOrUser,updateUserDataValidator, UserController.updateUser);
router.post('/forgot-password', UserController.sendForgotPasswordEmail);
router.post('/reset-password', tokenAndPasswordValidationMiddleware,UserController.resetPassword);

  export default router;