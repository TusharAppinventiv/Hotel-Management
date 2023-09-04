import express from 'express';
import { RoomCreatingController } from '../controllers/rooms.controller';
import { verifyAdmin } from '../middlewares/admin.auth';
import BookingController from '../controllers/booking.controller';
import {roomValidator} from '../middlewares/roomValidator'
import { verifyUser } from '../middlewares/users.auth';
import { bookingValidator, bookingConfirmation, BookingDeny } from '../middlewares/booking.validator';
import { verifyAdminOrUser } from '../middlewares/verifyAdminOrUser';
const router = express.Router();

router.post('/create', verifyAdmin,roomValidator, RoomCreatingController.createRoom);
router.get('/getRooms', verifyAdminOrUser, RoomCreatingController.getRooms);
router.put('/set-available/:roomId', verifyAdmin, RoomCreatingController.setRoomAvailabilityToTrue);
router.put('/set-unavailable/:roomId', verifyAdmin, RoomCreatingController.setRoomAvailabilityToFalse);
router.post('/bookRooms', verifyUser, bookingValidator, BookingController.createBooking);
router.post('/confirmBooking',  bookingConfirmation, BookingController.acceptBooking);
router.post('/denyBooking', verifyAdmin, BookingDeny, BookingController.denyBooking );
router.get('/available-rooms', BookingController.getAvailableRooms);

export default router