import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Best-effort in-memory rate limiting on serverless environments (3 requests per IP per 10 minutes)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot check: If the hidden 'website' field is populated, silent success
    if (website && typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100) {
      return NextResponse.json(
        { ok: false, error: "Name must be between 1 and 100 characters." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Message must be between 10 and 2000 characters." },
        { status: 400 }
      );
    }

    // IP rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

    if (clientIp !== "unknown" && isRateLimited(clientIp)) {
      return NextResponse.json(
        { ok: false, error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      console.warn("Contact route warning: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
      return NextResponse.json(
        { ok: false, error: "Message service is temporarily misconfigured. Please contact directly via email." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email.trim(),
      subject: `Portfolio message from ${name.trim()}`,
      text: `New Portfolio Message:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to dispatch email via Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
