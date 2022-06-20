import { Router } from 'express';
import saveSession from '../../middleware/saveSession';
import { webhookSendMessage } from './controller';

const app = Router();

app.post('/', saveSession, webhookSendMessage);

export default app;
