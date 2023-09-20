import express, { Router } from 'express';
import { UserController } from '../controllers/users.controller';
import { verifyAdmin } from '../middlewares/admin.auth';
import { signupValidator, loginValidator, updateUserDataValidator, tokenAndPasswordValidationMiddleware,} from '../middlewares/validator';
import { verifyAdminOrUser } from '../middlewares/verifyAdminOrUser';

class UserRouter {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/signup', signupValidator, UserController.signup);
    this.router.post('/login', loginValidator, UserController.login);
    this.router.post('/logout', verifyAdminOrUser, UserController.logout);
    this.router.get('/confirm/:confirmationToken', UserController.confirmAccount);
    this.router.delete('/delete', verifyAdmin, UserController.deleteUser);
    this.router.get('/getUsers', verifyAdmin, UserController.getUsers);
    this.router.put('/:id/deactivate', verifyAdmin, UserController.deactivateUser);
    this.router.put('/update', verifyAdminOrUser, updateUserDataValidator, UserController.updateUser);
    this.router.post('/forgot-password', UserController.sendForgotPasswordEmail);
    this.router.post('/reset-password', tokenAndPasswordValidationMiddleware, UserController.resetPassword);
  }
}

const userRouter = new UserRouter();
export default userRouter.router;
