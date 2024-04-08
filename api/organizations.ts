import { axios } from "./axios";
import { Organization } from "@prisma/client";

const ENDPOINT = "/api/organizations";

export async function getOrganizations() {
  const data = await axios
    .get(ENDPOINT)
    .then<Organization[]>((response) => response.data.data);
  return data;
}

export async function newOrganization(
  organization: Omit<Organization, "id" | "createdAt">,
) {
  const data = await axios
    .post(ENDPOINT, organization)
    .then<Organization>((response) => response.data.data);
  return data;
}
