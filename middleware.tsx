import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (!shouldExclude) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

function shouldExclude(request: NextRequest) {
  const path = request.nextUrl.pathname;

  return path.includes("."); // exclude all files in the public folder
}
