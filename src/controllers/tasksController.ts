import { Request, Response} from 'express';

export const home = (req: Request, res: Response) => {
    res.send('Home no controller');
}