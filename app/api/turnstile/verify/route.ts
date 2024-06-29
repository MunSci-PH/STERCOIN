import type { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";

const verifyEndpoint =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const secret = process.env.CF_SECRET!;

export async function POST(request: Request) {
  const { captchaToken } = (await request.json()) as { captchaToken: string };
  console.log(captchaToken);

  const res = await fetch(verifyEndpoint, {
    method: "POST",
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(captchaToken)}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const data = (await res.json()) as TurnstileServerValidationResponse;

  const errors = data["error-codes"].map((e) => e.toString());

  return new Response(JSON.stringify(data), {
    status: data.success ? 200 : 400,
    statusText: data.success ? "Success." : errors.join(" "),
    headers: {
      "content-type": "application/json",
    },
  });
}
