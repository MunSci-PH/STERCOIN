import { setAuthentication } from "@/utils/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { authType } = await req.json();
  setAuthentication(authType);

  return NextResponse.json({ message: "Logged out." }, { status: 200 });
}
