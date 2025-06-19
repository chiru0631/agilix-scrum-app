"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function getOrganization(slug){
    const { userId } =auth();

    if(!userId){
        throw new Error("User not authenticated");
    }

    const user =await db.user.findUnique({
        where: {
            clerkUserId: userId
        },
    });
    if(!user){
        throw new Error("User not found");
    }

    const organization = await clerkClient().organizations.getOrganization({
        slug
    })

    if(!organization){
        return null;
    }

    const {data:membership} = await clerkClient().organizations.getOrganizationMembershipList({
        organizationId:organization.id,

    });

    const userMembership = membership.find(
        (member) => member.publicUserData.userId === userId);


    if(!userMembership){
        return null;
    }

    return organization;


}