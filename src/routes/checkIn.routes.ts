import { CheckinController } from "../controllers/checkin.controller";
import { verifyAdmin } from "../middlewares/admin.auth";
import { checkIn, checkout, acceptCheckout} from "../middlewares/booking.validator";
import express from 'express'
import { verifyUser } from "../middlewares/users.auth";

const router = express.Router();

router.post('/create', verifyAdmin,checkIn, CheckinController.createCheckin);
router.post('/checkout',verifyUser, checkout, CheckinController.checkOut);
router.post('/acceptCheckout', verifyAdmin,acceptCheckout, CheckinController.acceptCheckOut);
router.post('/declineCheckout', verifyAdmin,acceptCheckout, CheckinController.declineCheckOut)

export default router;