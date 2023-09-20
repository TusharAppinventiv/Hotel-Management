import express, { Router } from 'express';
import { EventCreatingController } from '../controllers/events.controller';
import { verifyAdmin } from '../middlewares/admin.auth';
import { eventValidator } from '../middlewares/event.validator';
import { verifyAdminOrUser } from '../middlewares/verifyAdminOrUser';

class EventRouter {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', verifyAdmin, eventValidator, EventCreatingController.createEvent);
    this.router.get('/getEvents', verifyAdminOrUser, EventCreatingController.getEvents);
    this.router.delete('/deleteEvents', verifyAdmin, EventCreatingController.deleteEvent);
  }
}

const eventRouter = new EventRouter();
export default eventRouter.router;