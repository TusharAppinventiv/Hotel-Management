import express, { Router } from 'express';
import { CheckinController } from '../controllers/checkin.controller';
import { verifyAdmin } from '../middlewares/admin.auth';
import { checkIn, checkout, acceptCheckout } from '../middlewares/booking.validator';
import { verifyUser } from '../middlewares/users.auth';

class CheckinRouter {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', verifyAdmin, checkIn, CheckinController.createCheckin);
    this.router.post('/checkout', verifyUser, checkout, CheckinController.checkOut);
    this.router.post('/acceptCheckout', verifyAdmin, acceptCheckout, CheckinController.acceptCheckOut);
    this.router.post('/declineCheckout', verifyAdmin, acceptCheckout, CheckinController.declineCheckOut);
  }
}

const checkinRouter = new CheckinRouter();
export default checkinRouter.router;
