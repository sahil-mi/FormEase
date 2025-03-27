import { Request, Response, NextFunction } from "express";
import connectToDB from "../../models/db";
import AuthUser from "../../models/authModel";
import { CheckPassword } from "../../utils/passwordEncription";
import jwt from "jsonwebtoken";
import { CreateJWT_Token } from "../../utils/authJWT";

const Login = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const { username, password } = req.body;
    await connectToDB();
    const user = await AuthUser.findOne({ username: username });

    if (user) {
      const is_password_valid = await CheckPassword(password, user.password);
      if (is_password_valid) {
        const { access_token, refresh_token } = await CreateJWT_Token(username);
        res.json({
          message: "Login successfull",
          access: access_token,
          refresh: refresh_token,
        });
      } else {
        res.status(500).json({ message: "Password is not match" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    const errorMessage = err.message || "Failed To Login!";
    res.status(500).json({ error: errorMessage });
  }
};

export default Login;
