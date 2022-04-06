import { Router } from 'express';
import { webhookSendMessage } from './controller';

const app = Router();

app.post('/', webhookSendMessage);

export default app;
