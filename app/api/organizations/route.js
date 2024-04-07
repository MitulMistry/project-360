import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import {
  fetchUserOrganizations,
  createOrganization,
} from "@/app/lib/actions/organizations";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;

  const organizations = await fetchUserOrganizations(session.user.email);

  return NextResponse.json(
    {
      success: true,
      message: "List data organizations.",
      data: organizations,
    },
    {
      status: 200,
    },
  );
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;

  const { name } = await request.json();

  const organization = await createOrganization(name, session.user.email);

  return NextResponse.json(
    {
      success: true,
      message: "Organization created successfully.",
      data: organization,
    },
    { status: 201 },
  );
}

const unauthorizedResponse = NextResponse.json(
  {
    success: false,
    message: "Unauthorized",
  },
  {
    status: 401,
  },
);
