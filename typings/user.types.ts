import { User as PrismaUser, Role } from "@prisma/client";

export type UserForOrg = Omit<PrismaUser, "emailVerified"> & { role: Role };
