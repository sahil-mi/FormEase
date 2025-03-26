/**
|--------------------------------------------------
| signup api
|--------------------------------------------------
*/

import { Request, Response, NextFunction } from "express";
import connectToDB from "../../models/db";
import AuthUser from "../../models/authModel";
import { EncryptPassword } from "../../utils/passwordEncription";

const Signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = await req.body;

    const { first_name, last_name, password, email } = body;

    await connectToDB();

    const hashed_password = await EncryptPassword(password);

    const user = await AuthUser.create({
      first_name: first_name,
      last_name: last_name,
      password: hashed_password,
      email: email,
      username: email,
    });

    res.json({
      message:
        user.first_name +
        " " +
        user.last_name +
        " " +
        "user created successfully",
    });
  } catch (err: any) {
    const errorMessage = err.message || "Failed To Signup!";
    res.status(500).json({ error: errorMessage });
  }
};

export default Signup;
