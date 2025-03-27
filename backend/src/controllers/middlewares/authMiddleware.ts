import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const get_token_from_bearer = (token: string) => {
  let new_token = token.replace("Bearer", "").trim();
  return new_token;
};

export const VerifyAuthentication = (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  const headers = req.headers;
  const access_token = get_token_from_bearer(headers.authorization || "");

  try {
    var decoded = jwt.verify(access_token, "shhhhh");
    Next();
  } catch (err: any) {
    const errorMessage = err.message || "Invalid token";
    res.status(500).json({ message: errorMessage });
  }
};
