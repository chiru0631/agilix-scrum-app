"use client";

import React, { use, useState } from 'react'
import { isBefore, isAfter, formatDistanceToNow } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { updateSprintStatus } from '@/actions/sprints';
import { BarLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';
import { useEffect } from 'react';
import { useOrganization } from "@clerk/nextjs";


const SprintManager = ({sprint, setSprint, sprints, projectId}) => {
  const { organization } = useOrganization();
    const [status, setStatus] = useState(sprint.status);
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const now = new Date();
  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";   
    const canEnd = status === "ACTIVE";


    const {
      fn:updateStatus,
      loading,
      data:updatedStatus,
    }= useFetch(updateSprintStatus);

    const handleStatusChange = async (newStatus) => {
  if (!organization) {
    // Optionally show a toast
    return;
  }
  updateStatus(sprint.id, newStatus, organization.id);
};

  const handleSprintChange = (value) => {
    const selectedSprint = sprints.find((s) => s.id === value);
    
      setSprint(selectedSprint);
      setStatus(selectedSprint.status);
    
  }

  useEffect(() => {
    if(updatedStatus && updatedStatus.success){
      
      setStatus(updatedStatus.sprint.status);
      setSprint({
        ...sprint,
        status: updatedStatus.sprint.status,
      });
    }
  },[updatedStatus, loading])
  
  const getStatusText=()=>{
    if(status === "COMPLETED"){
      return "Sprint Completed";
    }
    if(status === "ACTIVE" && isAfter(now,endDate)){
      return `Overdue Sprint: ${formatDistanceToNow(endDate)}`;
    }
    if(status === "PLANNED" && isBefore(now,startDate)){
    
      return `Upcoming Sprint: ${formatDistanceToNow(startDate)}`;
    }
    return null;
  }

  return <>
  <div className='flex justify-between items-center gap-4'>
    <Select value={sprint.id} onValueChange={handleSprintChange}>
  <SelectTrigger className="bg-slate-950 self-start">
    <SelectValue placeholder="Select Sprint" />
  </SelectTrigger>
  <SelectContent>
    {sprints.map((sprint) => (
      <SelectItem key={sprint.id} value={sprint.id}>
        {sprint.name} ({format(sprint.startDate, 'dd/MM/yyyy')} - {format(sprint.endDate, 'dd/MM/yyyy')})
      </SelectItem>
    ))}
  </SelectContent>
</Select>

    {canStart && (
      <Button 
      className="bg-green-900 text-white"
      onClick={()=> {
        handleStatusChange("ACTIVE");
        disabled={loading}
      }}
       >
        Start Sprint
        </Button>)}
    {canEnd && (
      <Button 
      className="bg-red-900 text-white"
      onClick={()=> {
        handleStatusChange("COMPLETED");
        disabled={loading}
      }}
      >End Sprint</Button>)}
  </div>

      {loading && <BarLoader width={"100%"} className='mt-2' color="#36d7b7"/>}

  {    getStatusText() && (
    <Badge className="mt-3 ml-1 self-start">
      {getStatusText()}
    </Badge>
  )}
  </>
}

export default SprintManager;
