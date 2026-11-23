import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { rejectUnlessSignedIn, rejectUnlessRole } from "@/lib/server-auth";

export async function GET() {
  const { user, response } = await rejectUnlessSignedIn();
  if (response) return response;
  if (user!.role === Role.PIC) return NextResponse.json({ error: "Akses tim hanya untuk Manager dan Admin." }, { status: 403 });
  const select = user!.role === Role.ADMIN
    ? { id: true, name: true, email: true, role: true, section: true, capacityHours: true, active: true }
    : { id: true, name: true, role: true, section: true, capacityHours: true, active: true };
  const users = await prisma.user.findMany({ where: { active: true }, select, orderBy: [{ section: "asc" }, { name: "asc" }] });
  return NextResponse.json({ users });
}

const userSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(12).max(128),
  role: z.nativeEnum(Role),
  section: z.string().min(2).max(140),
  capacityHours: z.number().int().min(1).max(80).default(40),
});

export async function POST(request: Request) {
  const { response } = await rejectUnlessRole(Role.ADMIN);
  if (response) return response;
  const parsed = userSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Periksa nama, email, role, section, dan password (minimal 12 karakter)." }, { status: 400 });
  const passwordHash = await hash(parsed.data.password, 12);
  try {
    const user = await prisma.user.create({
      data: { ...parsed.data, passwordHash },
      select: { id: true, name: true, email: true, role: true, section: true, capacityHours: true, active: true },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Email sudah digunakan atau akun tidak dapat dibuat." }, { status: 409 });
  }
}
