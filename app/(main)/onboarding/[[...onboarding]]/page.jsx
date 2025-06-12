"use client";

import { OrganizationList, useOrganization } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
// This component is used to display a list of organizations for onboarding purposes.
import React, { useEffect } from 'react';

const Onboarding = () => {

    const {organization}= useOrganization();
    const router = useRouter();

    useEffect(() => {
        if(organization) {
            // If the user is already part of an organization, redirect them to the organization page.
            router.push(`/organization/${organization.slug}`);
        }
    },[organization]);
  return (
    <div className="flex justify-center items-center pt-14">
      <OrganizationList hidePersonal/>
    </div>
  );
};

export default Onboarding;
