"use client";

import React from 'react'
import { OrganizationSwitcher, SignedIn, useOrganization, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const OrgSwitcher = () => {

    const { isLoaded } =useOrganization();
    const { isLoaded: isUserLoaded } =useUser();
    const { pathname } =usePathname();

    if(!isLoaded || !isUserLoaded) {
        return null;
    }
  return <div>
      <SignedIn>
        <OrganizationSwitcher
    hidePersonal
    afterCreateOrganizationUrl="/organization/:slug"
    afterSelectOrganizationUrl="/organization/:slug"
    createOrganizationMode={pathname === "/onboarding" ? "navigation" : "modal"}
    createOrganizationUrl="/onboarding"
    appearance={{
        elements: {
            organizationSwitcherTrigger:
                "inline-flex items-center gap-2 rounded-lg border border-white bg-black px-5 pr-10 py-2 text-white font-bold min-w-[160px] shadow-[0_0_16px_4px_rgba(255,255,255,0.7)] hover:shadow-[0_0_32px_8px_rgba(255,255,255,1)] transition-all focus:outline-none focus:ring-2 focus:ring-white",
            organizationSwitcherTriggerIcon: "text-white",
        },
    }}
/>
      </SignedIn>
    </div>;
  
}

export default OrgSwitcher
