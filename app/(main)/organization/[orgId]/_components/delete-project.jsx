"use client";

import React, { use, useEffect } from 'react'
import { useOrganization } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { deleteProject } from '@/actions/projects';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const DeleteProject = ({ projectId }) => {
    const { organization, membership } = useOrganization();
    const Router = useRouter();

    const{
        data: deleted,
        loading: isDeleteing,
        error,
        fn: deleteProjectFn,
        
    }=useFetch(deleteProject);

    const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
        if (!organization) {
            toast.error("No organization selected");
            return;
        }
        deleteProjectFn({ projectId, orgId: organization.id });
    }
};

    useEffect(()=>{
        if(deleted?.success){
            toast.success(`Project ${deleted.projectName} deleted successfully!`);
            Router.refresh();
        }
    },[deleted])

    const isAdmin = membership?.role === 'org:admin';
    if (!isAdmin) {
        return <div>You do not have permission to delete this project.</div>;
    }
  return <>
  <Button variant='ghost' size='sm' className={`${isDeleteing ? "animate-pulse" : ""}`} onClick={handleDelete } disabled={isDeleteing}>
    <Trash2 className='h-4 w-4'/>
  </Button>
    {error && <p className='text-red-500 text-sm'>{error.message}</p>}
  </>
}

export default DeleteProject
