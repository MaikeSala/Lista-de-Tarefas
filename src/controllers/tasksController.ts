import { Request, Response} from 'express';
import { Task } from '../models/tasks';

export const home = async (req: Request, res: Response) => {
    let tasks = await Task.findAll();



    res.render('index', {
        title: 'Lista de Tarefas',
        tasks
    });
}