import { axios } from "./axios";
import { Organization } from "@prisma/client";

const ENDPOINT = "/api/organizations";

export async function getOrganizationsReq() {
  const data = await axios
    .get(ENDPOINT)
    .then<Organization[]>((response) => response.data.data);
  return data;
}

export async function createOrganizationReq(
  organization: Omit<Organization, "id" | "createdAt">,
) {
  const data = await axios
    .post(ENDPOINT, organization)
    .then<Organization>((response) => response.data.data);
  return data;
}

export async function updateOrganizationReq(
  organization: Omit<Organization, "createdAt">,
) {
  const data = await axios
    .patch(ENDPOINT, organization)
    .then<Organization>((response) => response.data.data);
  return data;
}

export async function deleteOrganizationReq(
  organization: Omit<Organization, "name" | "createdAt">,
) {
  const data = await axios
    .delete(ENDPOINT, { data: organization })
    .then<Organization>((response) => response.data.data);
  return data;
}

export async function joinOrganizationReq(
  organization: Omit<Organization, "name" | "createdAt">,
) {
  const data = await axios
    .post(`${ENDPOINT}/join`, organization)
    .then<Organization>((response) => response.data.data);
  return data;
}

export async function leaveOrganizationReq(
  organization: Omit<Organization, "name" | "createdAt">,
) {
  const data = await axios
    .post(`${ENDPOINT}/leave`, organization)
    .then<Organization>((response) => response.data.data);
  return data;
}
