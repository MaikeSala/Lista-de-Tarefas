import { Router } from 'express';
import * as tasksController from '../controllers/tasksController';

const router = Router();

router.get('/', tasksController.home);

export default router;