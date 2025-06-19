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
    const {data:membership} = await clerkClient().organizations.getOrganizationMembershipList({
        organizationId:organization.id,

    });

    const userMembership = membership.find(
        (member) => member.publicUserData.userId === userId);   

    if(!userMembership || userMembership.role !== "org:admin"){
        throw new Error("User not authorized to create projects");
    }

    
}