import jwt from "jsonwebtoken";

// create new access and refresh token
export const CreateJWT_Token = async (username: string,user_id:number) => {
  const ACCESS_TOKEN_SECRET: string | undefined =
    process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET: string | undefined =
    process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("Token secrets not found in env");
  }

  const access_token = jwt.sign({ user_id:user_id,username: username }, ACCESS_TOKEN_SECRET, {
    expiresIn: 120,
  });
  const refresh_token = jwt.sign({ user_id:user_id,username: username }, REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  return { access_token, refresh_token };
};

//renew new access and refreshtoken with previous valid refresh token
export const RenewToken = (
  token: string
): Promise<{ access_token: string; refresh_token: string }> => {
  return new Promise((resolve, reject) => {
    const ACCESS_TOKEN_SECRET: string | undefined =
      process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET: string | undefined =
      process.env.REFRESH_TOKEN_SECRET;

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      throw new Error("Token secrets not found in env");
    }

    jwt.verify(token, REFRESH_TOKEN_SECRET, async function (err, data) {
      if (err) {
        return reject({ message: "Invalid or expired refresh token" });
      }
      const { username,user_id } = data as { username: string,user_id:number };
      if (!username) {
        reject({ message: "Invalid token payload" });
      }
      try {
        if (username) {
          const { access_token, refresh_token } = await CreateJWT_Token(
            username,user_id
          );
          resolve({ access_token, refresh_token });
        }
      } catch (err: any) {
        reject({ message: "Failed to generate new tokens" });
      }
    });
  });
};
