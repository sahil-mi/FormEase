import { Request, Response, NextFunction } from "express";

const ListForms = async(req: Request, res: Response, Next: NextFunction) =>{
res.json({message:"forms list page"})
}

export default ListForms