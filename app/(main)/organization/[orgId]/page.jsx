import { getOrganization } from '@/actions/organization';
import React from 'react'
import OrgSwitcher from '@/components/org-switcher';

const Organization = async ({ params }) => {
    const { orgId } = params;

    const organization =await getOrganization(orgId);

    if(!organization){
        return <div>
            Organization not found
        </div>;
    }
  return( 
  <div className="container mx-auto">
      <div className='mb-4 flex fles-col sm:flex-row justify-between items-start'>
        <h1 className='text-5xl font-bold bg-gradient-to-br from-blue-500 via-blue-100 to from-blue-400 bg-clip-text text-transparent
 pb-2'>{organization.name}&rsquo;s Projects</h1>

        {/*org switcher */}
        <OrgSwitcher/>
      </div>
      <div className="mb-4">
        Show org projects
      </div>
      <div className="mt-8">
        User assigned and reported issues here
      </div>
    </div>
  );
  
};

export default Organization
