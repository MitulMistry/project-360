// Keep this as a server component to make the direct Prisma
// server fetch request and access the server session (for user).

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import type { Organization } from "@prisma/client";
import { OrganizationList } from "@features/organizations";
import { fetchUserOrganizations } from "@/app/lib/actions/organizations";

type UserOrganizationsProps = {
  className?: string;
};

export async function UserOrganizations({ className }: UserOrganizationsProps) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  console.log(session);

  const organizations: Organization[] | undefined = email
    ? await fetchUserOrganizations(email)
    : [];

  return (
    <OrganizationList className={className} organizations={organizations} />
  );
}
