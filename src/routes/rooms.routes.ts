import express, { Router } from 'express';
import { RoomCreatingController } from '../controllers/rooms.controller';
import { BookingController } from '../controllers/booking.controller';
import {roomValidator, bookingValidator, bookingConfirmation, BookingDeny} from '../middlewares/booking.validator'; 
import { verifyAdmin } from '../middlewares/admin.auth';
import { verifyUser } from '../middlewares/users.auth';
import { verifyAdminOrUser } from '../middlewares/verifyAdminOrUser';

class RoomBookingRouter {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', verifyAdmin, roomValidator, RoomCreatingController.createRoom);
    this.router.get('/getRooms', verifyAdminOrUser, RoomCreatingController.getRooms);
    this.router.put('/set-available/:roomId', verifyAdmin, RoomCreatingController.setRoomAvailabilityToTrue);
    this.router.put('/set-unavailable/:roomId', verifyAdmin, RoomCreatingController.setRoomAvailabilityToFalse);
    this.router.post('/bookRooms', verifyUser, bookingValidator, BookingController.createBooking);
    this.router.post('/confirmBooking', verifyAdmin, bookingConfirmation, BookingController.acceptBooking);
    this.router.post('/denyBooking', verifyAdmin, BookingDeny, BookingController.denyBooking);
    this.router.get('/available-rooms', BookingController.getAvailableRooms);
  }
}

const roomBookingRouter = new RoomBookingRouter();
export default roomBookingRouter.router;
