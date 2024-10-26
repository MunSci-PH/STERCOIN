import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  return response;
}
