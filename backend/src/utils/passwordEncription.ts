import bcrypt from "bcryptjs";

export const EncryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash("12345678", salt);
  return hashed_password;
};

export const CheckPassword = async (
  password: string,
  hashed_password: string
) => {
  const is_valid = await bcrypt.compare(password, hashed_password);
  return is_valid;
};
