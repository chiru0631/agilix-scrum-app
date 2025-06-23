"use server";

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createProject(data){
    const { userId, orgId } = auth();

    if(!userId){
        throw new Error("User not authenticated");
    }
    if(!orgId){
        throw new Error("Organization not found");
    }
    const { data: membershipList } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userMembership = membershipList.find(
    (membership) => membership.publicUserData.userId === userId
  );   

    if(!userMembership || userMembership.role !== "org:admin"){
        throw new Error("User not authorized to create projects");
    }

    try{
        const project = await db.project.create({
            data:{
                name: data.name,
                key: data.key,
                description: data.description,
                organizationId: orgId,
                
            },
        });

        return project;
    } catch (error){
        throw new Error("Failed to create project: " + error.message);
    }

    
}