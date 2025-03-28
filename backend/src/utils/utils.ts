export const get_token_from_bearer = (token: string) => {
    let new_token = token.replace("Bearer", "").trim();
    return new_token;
  };