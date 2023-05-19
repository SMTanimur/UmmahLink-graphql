import * as bcrypt from 'bcrypt';

export const createHash = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};
