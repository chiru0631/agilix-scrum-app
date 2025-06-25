"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createSprint(projectId, date) {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        throw new Error("User not authenticated or organization not found");
    }

    const project = await db.project.findUnique({
            where: { id: projectId },
        });
    if (!project) {
        throw new Error("Project not found");
    }

    if (orgIdFromClient && project.organizationId !== orgIdFromClient) {
        throw new Error("Project does not belong to the organization");
    }

    
    const sprint = await db.sprint.create({
        data: {
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            status: "Planned",
            projectId: project.id,
        },
    });

    return sprint;

}