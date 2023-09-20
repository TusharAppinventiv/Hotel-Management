import express, { Router } from 'express';
import { roomServiceController } from '../controllers/roomService.controller';
import { roomServiceValidator, roomServiceRequestValidator } from '../middlewares/roomService.validate';
import { verifyUser } from '../middlewares/users.auth';
import { verifyAdmin } from '../middlewares/admin.auth';
import { verifyAdminOrUser } from '../middlewares/verifyAdminOrUser';

class RoomServiceRouter {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', verifyAdmin, roomServiceValidator, roomServiceController.createRoomService);
    this.router.get('/getServices', verifyAdminOrUser, roomServiceController.getServices);
    this.router.delete('/deleteService', verifyAdmin, roomServiceController.deleteService);
    this.router.post('/order', verifyUser, roomServiceRequestValidator, roomServiceController.orderRoomService);
    this.router.put('/complete/:serviceTrackingId', verifyUser, roomServiceController.completeService);
  }
}

const roomServiceRouter = new RoomServiceRouter();
export default roomServiceRouter.router;
