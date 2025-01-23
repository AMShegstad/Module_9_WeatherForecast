import { Router } from 'express';
import weatherRoutes from './weatherRoutes.js';
import testRoutes from './testRoutes.js';

const router = Router();

router.use('/test/', testRoutes);
router.use('/weather/', weatherRoutes);

export default router;
