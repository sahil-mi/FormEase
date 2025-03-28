import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { get_token_from_bearer } from "../utils/utils";

export const VerifyAuthentication = (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  const headers = req.headers;
  const access_token = get_token_from_bearer(headers.authorization || "");

  try {
    const ACCESS_TOKEN_SECRET: string | undefined =
      process.env.ACCESS_TOKEN_SECRET;

    if (!ACCESS_TOKEN_SECRET) {
      throw new Error("token not found in the env");
    }
    var decoded = jwt.verify(access_token, ACCESS_TOKEN_SECRET);
    Next();
  } catch (err: any) {
    const errorMessage = err.message || "Invalid token";
    res.status(500).json({ message: errorMessage });
  }
};
