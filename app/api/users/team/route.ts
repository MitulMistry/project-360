import { NextResponse } from "next/server";

export async function GET() {
  // This route response is meant to inform client that an organization (team) id
  // was not provided, which is necessary to fetch
  return NextResponse.json(
    {
      success: false,
      message: "Must specify organization id.",
      data: null,
    },
    {
      status: 400,
    },
  );
}
