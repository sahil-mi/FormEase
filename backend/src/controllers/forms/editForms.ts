import { Request, Response, NextFunction } from "express";
import connectToDB from "../../models/db";
import FormDocument from "../../models/formDocumentModel";
import { get_user } from "../../utils/getUser";
import mongoose from "mongoose";

interface queryInterface {
  name: string;
  heading: string;
  is_favorite: boolean;
  last_edited: Date;
  user: string;
  description: string;
}

const EditForms = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const body = req.body;
    const { form_id, name, heading, description, is_favorite } = body;

    //form_id validations
    if (!form_id) {
      res.status(400).json({ message: "Form id required!" });
    } else if (!mongoose.isValidObjectId(form_id)) {
      res.status(400).json({ message: "Form id not valid!" });
    }

    await connectToDB();
    //checking is form exists
    const form_exists = await FormDocument.exists({ _id: form_id });

    if (form_exists) {
      //creating query
      let query = {} as queryInterface;

      if (name) {
        query["name"] = name;
      }

      if (heading) {
        query["heading"] = heading;
      }

      if (description) {
        query["description"] = description;
      }

      if (is_favorite) {
        query["is_favorite"] = is_favorite;
      }

      query["last_edited"] = new Date();

      // updating form
      const form = await FormDocument.findByIdAndUpdate(form_id, query);

      res.json({ message: "Successfully Updated" });
    } else {
      res.status(404).json({ message: "Form not found!" });
    }
  } catch (err: any) {
    const errorMessage = err.message || "Something Went Wrong";
    res.status(500).json({ message: errorMessage });
  }
};

export default EditForms;
