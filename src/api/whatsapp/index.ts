import { Router } from 'express';
import { whatsappSendMessage } from './controller';

const app = Router();

app.post('/', whatsappSendMessage);

export default app;
