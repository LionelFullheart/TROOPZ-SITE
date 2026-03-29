import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Please complete all fields before sending your request." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message:
      "Your request was captured in demo mode. Replace this route with email or CRM handling when you're ready.",
  });
}
