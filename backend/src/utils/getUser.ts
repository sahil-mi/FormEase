import { get_token_from_bearer } from "./utils";

export const get_user = (authorization: string) => {
  const token = get_token_from_bearer(authorization);
  const token_splits = token.split(".");
  const payload = token_splits[1];
  const decoded = atob(payload);
  return JSON.parse(decoded); //eg output : {"user_id":"67e3ac8487e46e237e6575cd","username":"sahil@gmail.com","iat":1743065157,"exp":1743068757}
};
