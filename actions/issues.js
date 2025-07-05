"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createIssue(projectId, data) {
    const { userId } = await auth();
    const orgId = data.orgId; // get orgId from the data

    if (!userId || !orgId) {
        throw new Error("User not authenticated or organization not found");
    }

    let user = await db.user.findUnique({
        where:{
            clerkUserId : userId
        }
    });

    const lastIssue = await db.issue.findFirst({
        where: {
            projectId: projectId,
            status: data.ststus,
        },
        orderBy: {
            order: 'desc',
        },
    });

    const newOrder = lastIssue ? lastIssue.order + 1 : 0;

    const issue = await db.issue.create({
         data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      projectId: projectId,
      sprintId: data.sprintId,
      reporterId: user.id,
      assigneeId: data.assigneeId || null, // Add this line
      order: newOrder,
    },
    include: {
      assignee: true,
      reporter: true,
    },
    });

    return issue;
}

export async function getIssuesForSprint(sprintId, orgIdFromClient) {
  const { userId } = await auth();

  if (!userId || !orgIdFromClient) {
    throw new Error("Unauthorized");
  }

  const issues = await db.issue.findMany({
    where: { sprintId: sprintId },
    orderBy: [{ status: "asc" }, { order: "asc" }],
    include: {
      assignee: true,
      reporter: true,
    },
  });

  return issues;
}