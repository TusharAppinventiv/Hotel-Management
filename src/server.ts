import express from 'express';
import { sequelize } from './utils/database/database';
import {redFun} from './utils/redis/redis'
import userRouter from './routes/users.routes';
import roomRouter from './routes/rooms.routes'
import * as dotenv from 'dotenv';
import path from 'path';
import eventRouter from './routes/events.routes'
import { EventCreatingService } from './services/events.service';
import serviceRouter from './routes/roomService.routes';
import checkInRouter from './routes/checkIn.routes'

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/checkIn', checkInRouter)
app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/room', roomRouter);
app.use('/services', serviceRouter);

sequelize.sync().then(() => {
    redFun();
    EventCreatingService.startEventReminderCron();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

