"use client";
import OrgSwitcher from '@/components/org-switcher';
import { useOrganization, useUser } from '@clerk/nextjs';
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { projectSchema } from '@/app/lib/validators';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { createProject } from '@/actions/projects';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateProjectPage = () => {

  const {isLoaded: isOrgLoaded, membership, organization }=useOrganization();

  const{ isLoaded: isUserLoaded }=useUser();
  const [isAdmin, setIsAdmin]=useState(false);

  const  router = useRouter();


  const {register,handleSubmit,formState:{errors},  }= useForm({
    resolver: zodResolver(projectSchema)
  });

  useEffect(()=>{
    if(isOrgLoaded && isUserLoaded && membership){
      setIsAdmin(membership.role === 'org:admin');
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {data: project,
    loading,
    error,
    fn: createProjectFn,
  }=useFetch(createProject);

   useEffect(()=>{
    if(project){
      toast.success(`Project ${project.name} created successfully!`);
      router.push(`/project/${project.id}`);
    }
  },[loading]);

  if(!isOrgLoaded || !isUserLoaded){
    return null; // or a loading spinner
  }

  

  const onSubmit = async (data) => {
    if (!organization) {
      toast.error("No organization selected");
      return;
    }
    createProjectFn({ ...data, orgId: organization.id });
  };

 

  if(!isAdmin){
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <span className=' text-3xl bg-gradient-to-br from-blue-500 via-blue-100 to from-blue-400 bg-clip-text text-transparent'
        >Oops!... Only Admins can create projects.</span>
        <OrgSwitcher/>
      </div>
    );
  }

  return (
    <div className="constainer mx-auto py-10">
      <h1 className='text-6xl text-center font-bold mb-8 bg-gradient-to-br from-blue-500 via-blue-100 to from-blue-400 bg-clip-text text-transparent' 
      >Create New Project </h1>

      <form className='flex flex-col space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
        <Input
        id="name"
        className="bg-slate-950  "
        placeholder="Project Name"
        {...register("name")}
        
        />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div>
        <Input
        id="key"
        className="bg-slate-950  "
        placeholder="Project Key (Ex: PROJ-123)"
        {...register("key")}
        
        />
        {errors.key && <p className='text-red-500'>{errors.key.message}</p>}
        </div>

        <div>
        <Textarea
        id="description"
        className="bg-slate-950  h-28"
        placeholder="Project Description"
        {...register("description")}

        />
        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
        </div>

        <Button disabled={loading} type="submit" size="lg" className="bg-red-500 text-white" onSubmit={handleSubmit(onSubmit)} >{loading ?"Creating ..." : "Create Project"}</Button>
        {error && <p className='text-red-500'>{error.message}</p>}
      </form>

    </div>
  )
}

export default CreateProjectPage 
