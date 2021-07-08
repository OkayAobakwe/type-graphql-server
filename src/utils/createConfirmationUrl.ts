import { redis } from "../redis";
import { v4 } from "uuid";
import { confirmUserPrefix } from "../modules/constants/rediPrefiexes";

export const createConfirmationUrl =  async (userId: number) => {
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24);
  return `http://locahost:3000/confirm/${token}`;
};
