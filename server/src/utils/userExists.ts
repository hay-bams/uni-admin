import { Database } from "../lib/types";

export const userExist = async (db: Database, username: string) => {
  const user = await db.users.findOne({
    username,
  });

  if (user) {
    return true;
  }

  return false;
};