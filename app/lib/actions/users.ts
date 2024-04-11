import prisma from "@/lib/prisma";
import type { User } from "@prisma/client";

export const findUser = async (id: string): Promise<User | null> =>
  prisma.user.findUnique({
    where: { id: id },
  });

export const findUserByEmail = async (email: string): Promise<User | null> =>
  prisma.user.findUnique({
    where: { email: email },
  });
