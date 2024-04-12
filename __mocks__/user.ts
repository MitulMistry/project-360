import type { User } from "@prisma/client";
import { Role } from "@prisma/client";
import type { UserForOrg } from "@/typings/user.types";

const date = new Date();

export const mockUser1: User = {
  id: "clud0qust000208l4cq5f5usy",
  createdAt: new Date(date.getDate()),
  name: "Bob Smith",
  email: "Bob@example.com",
  emailVerified: null,
  image: "",
};

export const mockUsersSimple1: UserForOrg[] = [
  {
    id: "clud0qust000208l4cq5f5usy",
    createdAt: new Date(date.getDate()),
    name: "Alice Taylor",
    email: "alice@prisma.io",
    image: "",
    role: Role.OWNER,
  },
  {
    id: "clud0qust000208l4cq5f5usy",
    createdAt: new Date(date.getDate()),
    name: "Zack Smith",
    email: "zack@prisma.io",
    image: "",
    role: Role.MANAGER,
  },
  {
    id: "clud0qust000208l4cq5f5usy",
    createdAt: new Date(date.getDate()),
    name: "Dan Russel",
    email: "dan@prisma.io",
    image: "",
    role: Role.ASSIGNEE,
  },
  {
    id: "clud0qust000208l4cq5f5usy",
    createdAt: new Date(date.getDate()),
    name: "Holly Davis",
    email: "holly@prisma.io",
    image: "",
    role: Role.ASSIGNEE,
  },
  {
    id: "clud0qust000208l4cq5f5usy",
    createdAt: new Date(date.getDate()),
    name: "Robin Brooks",
    email: "robin@prisma.io",
    image: "",
    role: Role.MANAGER,
  },
];
