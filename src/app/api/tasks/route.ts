import { NextResponse } from "next/server";
import { z } from "zod";
import { Role, TaskPriority, TaskStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { rejectUnlessSignedIn } from "@/lib/server-auth";

const taskSchema = z.object({
  title: z.string().trim().min(3).max(180),
  description: z.string().max(4000).optional().nullable(),
  category: z.string().trim().min(2).max(80).default("Rutin"),
  priority: z.nativeEnum(TaskPriority).default(TaskPriority.NORMAL),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.NEW),
  deadline: z.string().datetime().optional().nullable(),
  estimatedHours: z.coerce.number().min(0.25).max(500).default(1),
  assigneeId: z.string().optional().nullable(),
});

export async function GET() {
  const { user, response } = await rejectUnlessSignedIn();
  if (response) return response;

  const where = user!.role === Role.PIC ? { assigneeId: user!.id } : undefined;
  const tasks = await prisma.task.findMany({
    where,
    include: { assignee: { select: { id: true, name: true, section: true } } },
    orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
    take: 250,
  });
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const { user, response } = await rejectUnlessSignedIn();
  if (response) return response;

  const parsed = taskSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Periksa kembali detail pekerjaan.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const assigneeId = user!.role === Role.PIC ? user!.id : (data.assigneeId || null);
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description || null,
      category: data.category,
      priority: data.priority,
      status: data.status,
      deadline: data.deadline ? new Date(data.deadline) : null,
      estimatedHours: data.estimatedHours,
      assigneeId,
      createdById: user!.id,
      events: { create: { actorId: user!.id, toStatus: data.status, toAssigneeId: assigneeId, note: "Pekerjaan dibuat" } },
    },
    include: { assignee: { select: { id: true, name: true, section: true } } },
  });
  return NextResponse.json({ task }, { status: 201 });
}
