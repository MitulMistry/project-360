import type { User } from "@prisma/client";

const date = new Date();

export const mockUser1: User = {
  id: "clud0qust000208l4cq5f5usy",
  createdAt: new Date(date.getDate()),
  name: "Bob Smith",
  email: "Bob@example.com",
  emailVerified: null,
  image: "",
};
