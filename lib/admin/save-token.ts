import { createHmac, timingSafeEqual } from "crypto";

const TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function secret() {
  const s = process.env.BETTER_AUTH_SECRET;
  if (!s) throw new Error("BETTER_AUTH_SECRET is not set");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Mint a token for admin form POSTs (avoids cookie gaps on Route Handlers). */
export function mintSaveToken(email: string) {
  const exp = Date.now() + TTL_MS;
  const body = `${email.trim().toLowerCase()}.${exp}`;
  return `${body}.${sign(body)}`;
}

export function verifySaveToken(token: string): { email: string } | null {
  // Emails contain dots, so take the expiry and signature from the right.
  const sigDot = token.lastIndexOf(".");
  if (sigDot <= 0) return null;
  const body = token.slice(0, sigDot);
  const sig = token.slice(sigDot + 1);
  const expDot = body.lastIndexOf(".");
  if (expDot <= 0) return null;
  const email = body.slice(0, expDot);
  const expStr = body.slice(expDot + 1);
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  if (!email.includes("@")) return null;
  return { email };
}
