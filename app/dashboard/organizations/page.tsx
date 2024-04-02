// Keep this as a server component to make the direct Prisma
// server fetch request and access the server session (for user).

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { PageContainer } from "@features/layout";
import type { Organization } from "@prisma/client";
import { OrganizationList } from "@features/organizations";
import styles from "./page.module.scss";
import { fetchUserOrganizations } from "@/app/lib/actions/organizations";
import OrganizationsInterface from "./organizations-interface";

export default async function Organizations() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const organizations: Organization[] | undefined = email
    ? await fetchUserOrganizations(email)
    : [];

  return (
    <PageContainer title="Organizations">
      <div className={styles.container}>
        <OrganizationsInterface />
        <OrganizationList organizations={organizations} />
      </div>
    </PageContainer>
  );
}
