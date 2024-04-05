import { createSSRClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createSSRClient();

  await supabase.auth.signOut();

  return NextResponse.redirect(`${requestUrl.origin}/dashboard/login`, {
    status: 301,
  });
}
