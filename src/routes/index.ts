import { Router } from 'express';
import whatsappRoutes from '../api/whatsapp';

const router = Router();

router.use('/whatsapp', whatsappRoutes);

export default router;
