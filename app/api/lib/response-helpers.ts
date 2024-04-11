import { NextResponse } from "next/server";

export const unauthorizedResponse = NextResponse.json(
  {
    success: false,
    message: "Unauthorized",
  },
  {
    status: 401,
  },
);

export const failedResponse = (data?: object) =>
  NextResponse.json(
    {
      success: false,
      data: null,
      ...data,
    },
    {
      status: 422,
    },
  );

export const checkForErrors = (data?: object) => !data || "errors" in data;
