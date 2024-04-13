import { axios } from "./axios";
// import type { User } from "@prisma/client";
import type { UserForOrg } from "@/typings/user.types";

const ENDPOINT = "/api/users";

export async function getTeamReq(orgId: string) {
  const data = await axios
    .get(`${ENDPOINT}/team/${orgId}`)
    .then<UserForOrg[]>((response) => response.data.data);
  return data;
}
