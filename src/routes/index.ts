import { Router } from 'express';
import webhookRoutes from '../api/webhook';

const router = Router();

router.use('/webhook', webhookRoutes);

export default router;
