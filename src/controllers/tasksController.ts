import { Request, Response} from 'express';
import { Task } from '../models/tasks';

export const getAll = async (req: Request, res: Response) => {
    let tasks = await Task.findAll();
	return res.status(200).json(tasks);
};

export const createTask = async (req: Request, res: Response) => {

	const dateUTC = new Date()

	const createdTask = await Task.create({
		title: req.body.title,
		status: req.body.status, 
		created_at: dateUTC,
	});

	return res.status(201).json(createdTask);
}	

export const deleteTask = async (req: Request, res: Response) => {
	const id: string = req.params.id;

	const deletedTask = await Task.destroy({where: {id}});
	return res.status(204).json();
};

export const updateTask = async (req: Request, res: Response) => {
	const id: string = req.params.id;

	const updatedTask = await Task.update(
		{ 
			title: req.body.title, 
			status: req.body.status}, 
		{
			where: {id}
		})
	return res.status(204).json();
}
