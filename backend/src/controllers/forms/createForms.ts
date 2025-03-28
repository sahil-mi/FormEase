import { Request, Response, NextFunction } from "express";
import connectToDB from "../../models/db";
import FormDocument from "../../models/formDocumentModel";
import { get_user } from "../../utils/getUser";

const CreateForms = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const headers = req.headers;
    const authorization = headers.authorization;

    if (authorization) {
      const { user_id } = get_user(authorization);
      const body = req.body;
      const { name, heading, description, is_favorite } = body;

      await connectToDB();
      const form = await FormDocument.create({
        name: name || "Untitled form",
        heading: heading || "Untitled form",
        description: description || "",
        is_favorite: is_favorite || false,
        user: user_id,
      });

      res.json({ message: "form created succesfully" });
    } else {
      throw new Error("authorization not found");
    }
  } catch (err: any) {
    const errorMessage = err.message || "Something Went Wrong";
    res.status(500).json({ message: errorMessage });
  }
};

export default CreateForms;
