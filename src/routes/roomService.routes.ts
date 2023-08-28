import { roomServiceController } from '../controllers/roomService.controller';
import { roomServiceValidator, roomServiceRequestValidator } from '../middlewares/roomService.validate';
import express from 'express'
import { verifyUser } from '../middlewares/users.auth';
import { verifyAdmin } from '../middlewares/admin.auth';

const router = express.Router();
router.post('/create', verifyAdmin, roomServiceValidator, roomServiceController.createRoomService );
router.get('/getServices', verifyUser,verifyAdmin,roomServiceController.getServices);
router.delete('/deleteEvents', verifyAdmin,roomServiceController.deleteService);
router.post('/order', verifyUser,roomServiceRequestValidator, roomServiceController.orderRoomService);
router.put("/complete/:serviceTrackingId", verifyUser,roomServiceController.completeService);
export default router;