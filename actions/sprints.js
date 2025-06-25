"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createSprint({ projectId, orgId, name, startDate, endDate }) {
    const { userId } = await auth();

    if(!userId || !orgId) {
        throw new Error("User not authenticated or organization not found");
    }

    const project = await db.project.findUnique({
        where: { id: projectId },
    });
    if (!project) {
        throw new Error("Project not found");
    }

    const sprint = await db.sprint.create({
        data: {
            name,
            startDate,
            endDate,
            status: "PLANNED",
            projectId: project.id,
        },
    });

    return sprint;
}