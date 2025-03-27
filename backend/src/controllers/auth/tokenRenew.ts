import { Request, Response, NextFunction } from "express";
import { RenewToken } from "../../utils/authJWT";

const TokenRenew = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const { refresh } = req.body;

    const { access_token, refresh_token } = await RenewToken(refresh);

    res.json({
      message: "Token renewel successfull",
      access: access_token,
      refresh: refresh_token,
    });
  } catch (err: any) {
    const errorMessage = err.message || "Failed To Login!";
    res.status(500).json({ error: errorMessage });
  }
};

export default TokenRenew;
