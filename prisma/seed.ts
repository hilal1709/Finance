import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hash } from "bcryptjs";

const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
const name = process.env.BOOTSTRAP_ADMIN_NAME?.trim() || "Accounting Admin";

if (!email || !password || password.length < 12) {
  throw new Error("Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD (at least 12 characters) before seeding.");
}
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
try {
  const passwordHash = await hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash, name, role: "ADMIN", section: "Department of Accounting" },
    update: { passwordHash, name, role: "ADMIN", active: true },
  });
  console.info(`Bootstrap admin is ready for ${email}.`);
} finally {
  await prisma.$disconnect();
}
