import { NextResponse } from "next/server";
import { z } from "zod";
import { Role, TaskPriority, TaskStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { rejectUnlessSignedIn } from "@/lib/server-auth";

const patchSchema = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  blockerNote: z.string().max(2000).optional().nullable(),
  assigneeId: z.string().optional().nullable(),
  note: z.string().max(2000).optional().nullable(),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { user, response } = await rejectUnlessSignedIn();
  if (response) return response;
  const { id } = await context.params;
  const parsed = patchSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Periksa kembali perubahan pekerjaan." }, { status: 400 });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return NextResponse.json({ error: "Pekerjaan tidak ditemukan." }, { status: 404 });

  const isManager = user!.role === Role.MANAGER || user!.role === Role.ADMIN;
  const isOwner = task.assigneeId === user!.id || task.createdById === user!.id;
  if (!isManager && !isOwner) return NextResponse.json({ error: "Pekerjaan ini bukan dalam akses Anda." }, { status: 403 });
  if (parsed.data.assigneeId !== undefined && !isManager) return NextResponse.json({ error: "Hanya Manager yang dapat memindahkan PIC." }, { status: 403 });

  const nextAssigneeId = parsed.data.assigneeId === undefined ? task.assigneeId : parsed.data.assigneeId;
  const updated = await prisma.$transaction(async (tx) => {
    const changed = await tx.task.update({
      where: { id },
      data: {
        status: parsed.data.status,
        priority: parsed.data.priority,
        progress: parsed.data.progress,
        blockerNote: parsed.data.blockerNote === undefined ? undefined : (parsed.data.blockerNote || null),
        assigneeId: nextAssigneeId,
      },
      include: { assignee: { select: { id: true, name: true, section: true } } },
    });
    if (parsed.data.status !== task.status || nextAssigneeId !== task.assigneeId || parsed.data.note) {
      await tx.taskEvent.create({
        data: {
          taskId: id,
          actorId: user!.id,
          fromStatus: task.status,
          toStatus: parsed.data.status ?? task.status,
          fromAssigneeId: task.assigneeId,
          toAssigneeId: nextAssigneeId,
          note: parsed.data.note || (nextAssigneeId !== task.assigneeId ? "PIC pekerjaan diperbarui" : null),
        },
      });
    }
    return changed;
  });
  return NextResponse.json({ task: updated });
}
