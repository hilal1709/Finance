import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { Role } from "@/generated/prisma/enums";

export async function currentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function rejectUnlessSignedIn() {
  const user = await currentUser();
  if (!user) {
    return { user: null, response: NextResponse.json({ error: "Silakan masuk terlebih dahulu." }, { status: 401 }) };
  }
  return { user, response: null };
}

export async function rejectUnlessRole(...roles: Role[]) {
  const result = await rejectUnlessSignedIn();
  if (!result.user || result.response) return result;
  if (!roles.includes(result.user.role)) {
    return { user: null, response: NextResponse.json({ error: "Anda tidak memiliki akses untuk tindakan ini." }, { status: 403 }) };
  }
  return result;
}
