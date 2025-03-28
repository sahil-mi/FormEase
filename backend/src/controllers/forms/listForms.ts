import { Request, Response, NextFunction } from "express";
import connectToDB from "../../models/db";
import FormDocument from "../../models/formDocumentModel";

const ListForms = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    await connectToDB();
    const forms = await FormDocument.find({last_edited:{$ne:null}});
    res.json({ data: forms });
  } catch (err: any) {
    const errorMessage = err.message || "Something Went Wrong";
    res.status(500).json({ message: errorMessage });
  }
};

export default ListForms;
