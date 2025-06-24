"use server";

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createProject(data) {
    const { userId } = await auth();
    const orgId = data.orgId;

    if (!userId) {
        throw new Error("User not authenticated");
    }
    if (!orgId) {
        throw new Error("Organization not found");
    }
    const { data: membershipList } =
        await clerkClient().organizations.getOrganizationMembershipList({
            organizationId: orgId,
        });

    const userMembership = membershipList.find(
        (membership) => membership.publicUserData.userId === userId
    );

    if (!userMembership || userMembership.role !== "org:admin") {
        throw new Error("User not authorized to create projects");
    }

    try {
        const project = await db.project.create({
            data: {
                name: data.name,
                key: data.key,
                description: data.description,
                organizationId: orgId,
            },
        });

        return project;
    } catch (error) {
        throw new Error("Failed to create project: " + error.message);
    }
}

export async function getProjects(orgId) {
    const {userId}= await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
    where: { clerkUserId: userId },
});

     if(!user){
        throw new Error("User not found");
     }

const projects = await db.project.findMany({
    where: {
        organizationId: orgId,
    },
    orderBy: {
        createdAt: 'desc',
    },
});

    return projects;


}

export async function deleteProject({ projectId, orgId }) {
    const { userId } = await auth();

    if (!userId || !orgId) {
        throw new Error("User not authenticated or organization not found");
    }

    // You may want to check membership here as well, similar to createProject
    // (optional, but recommended for security)

    const project = await db.project.findUnique({
        where: { id: projectId },
    });

    if (!project || project.organizationId !== orgId) {
        throw new Error("Project not found or does not belong to the organization");
    }

    await db.project.delete({
        where: { id: projectId },
    });

    return { success: true, projectName: project.name };
}


export async function getProject(projectId, orgIdFromClient) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const project = await db.project.findUnique({
        where: { id: projectId },
        include: {
            sprints: {
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    });

    if (!project) {
        throw new Error("Project not found");
    }
    // Optionally check orgId if passed
    if (orgIdFromClient && project.organizationId !== orgIdFromClient) {
        throw new Error("Project does not belong to the organization");
    }

    return project;
}