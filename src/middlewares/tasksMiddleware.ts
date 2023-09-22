import { NextFunction, Request, Response, response} from 'express';

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;

    if(body.title === undefined){
        return res.status(400).json({message:'Campo title obrigatório'});
    }
    if(body.title === ''){
        return res.status(400).json({message:'Campo title não pode ser vazio'});
    }
    if(body.status === undefined){
        return res.status(400).json({message:'Campo status obrigatório'});
    }
    if(body.status === ''){
        return res.status(400).json({message:'Campo status não pode ser vazio'});
    }

    next();
};