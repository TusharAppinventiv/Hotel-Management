import { eventValidator } from "../middlewares/event.validator";
import { EventCreatingController } from "../controllers/events.controller";
import express from 'express'
import { verifyAdmin } from "../middlewares/admin.auth";
import { verifyUser } from "../middlewares/users.auth";

const router = express.Router();
router.post('/create',verifyAdmin, eventValidator, EventCreatingController.createEvent);
router.get('/getEvents',verifyAdmin,verifyUser, EventCreatingController.getEvents);
router.delete('/deleteEvents', verifyAdmin, EventCreatingController.deleteEvent);

export default router;