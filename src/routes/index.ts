import { Router } from 'express';
import * as tasksController from '../controllers/tasksController';
import { validateBody } from '../middlewares/tasksMiddleware';

const router = Router();

router.get('/tasks', tasksController.getAll);
router.post('/tasks',validateBody, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',validateBody, tasksController.updateTask);

export default router;