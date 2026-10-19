import { cookies, headers } from "next/headers";
import { createNeonAuth } from "@neondatabase/auth/next/server";
import {
  createAuthServer,
  NEON_AUTH_COOKIE_PREFIX,
} from "@neondatabase/auth/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL!;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET!;
const sameSite = "lax" as const;

/**
 * Neon Auth's bundled Next adapter reads cookies from headers().get("cookie").
 * That header is often empty in Server Actions, so saves look logged-out while
 * RSC pages still work. Build the Cookie header from cookies() instead.
 */
async function createFixedNextRequestContext() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  return {
    getCookies() {
      const fromStore = cookieStore
        .getAll()
        .filter((c) => c.name.startsWith(NEON_AUTH_COOKIE_PREFIX))
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
      if (fromStore) return fromStore;

      // Fallback: raw Cookie header (RSC / route handlers)
      const raw = headerStore.get("cookie") ?? "";
      if (!raw) return "";
      return raw
        .split(";")
        .map((part) => part.trim())
        .filter((part) => part.startsWith(NEON_AUTH_COOKIE_PREFIX))
        .join("; ");
    },
    setCookie(
      name: string,
      value: string,
      options: Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2],
    ) {
      try {
        cookieStore.set(name, value, options);
      } catch {
        // RSC render cannot set cookies (Neon issue #196). Safe to ignore;
        // middleware / the next Server Action will refresh.
      }
    },
    getHeader(name: string) {
      return headerStore.get(name) ?? null;
    },
    getOrigin() {
      return (
        headerStore.get("origin") ||
        headerStore.get("referer")?.split("/").slice(0, 3).join("/") ||
        ""
      );
    },
    getFramework() {
      return "nextjs";
    },
  };
}

const authServer = createAuthServer({
  baseUrl,
  context: createFixedNextRequestContext,
  cookieSecret,
  sameSite,
});

// handler()/middleware() only exist on createNeonAuth; reuse for the API route.
const neonAuth = createNeonAuth({
  baseUrl,
  cookies: { secret: cookieSecret, sameSite },
});

export const auth = Object.assign(authServer, {
  handler: neonAuth.handler.bind(neonAuth),
  middleware: neonAuth.middleware.bind(neonAuth),
});
