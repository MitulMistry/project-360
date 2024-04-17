import { axios } from "./axios";
import type { Organization, OrganizationUser } from "@prisma/client";
import type { OrganizationWithOwner } from "@/typings/organization.types";

const ENDPOINT = "/api/organizations";

export async function getOrganizationsReq() {
  const data = await axios
    .get(ENDPOINT)
    .then<OrganizationWithOwner[]>((response) => response.data.data);
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

export async function updateOrganizationUserReq(
  organizationUser: Omit<OrganizationUser, "joinedAt">,
) {
  const data = await axios
    .patch(`${ENDPOINT}/orgusers`, organizationUser)
    .then<OrganizationUser>((response) => response.data.data);
  return data;
}
