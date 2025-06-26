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

export async function updateSprintStatus(sprintId, newStatus, orgIdFromClient) {
    const { userId } = await auth();

    if (!userId || !orgIdFromClient) {
        throw new Error("User not authenticated or organization not found");
    }

    // Fetch the sprint and its project
    const sprint = await db.sprint.findUnique({
        where: { id: sprintId },
        include: { project: true },
    });

    if (!sprint) {
        throw new Error("Sprint not found");
    }

    if (sprint.project.organizationId !== orgIdFromClient) {
        throw new Error("You do not have permission to update this sprint");
    }

    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);

    if (newStatus === "ACTIVE" && (now < startDate || now > endDate)) {
        throw new Error("Sprint cannot be started outside of its scheduled dates");
    }

    if (newStatus === "COMPLETED" && sprint.status !== "ACTIVE") {
        throw new Error("Sprint cannot be completed outside of its scheduled dates");
    }

    const updatedSprint = await db.sprint.update({
        where: { id: sprintId },
        data: { status: newStatus },
    });

    return { success: true, sprint: updatedSprint };

}