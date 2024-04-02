import { redirect } from "next/navigation";
import { Routes } from "@config/routes";

export default function Dashboard() {
  redirect(Routes.organizations);
}
