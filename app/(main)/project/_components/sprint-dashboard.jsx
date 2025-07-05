"use client";

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import SprintManager from './sprint-manager'
import React, { useState } from 'react'
import statuses from "@/data/status";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import IssueCreationDrawer from './create-issue';
import useFetch from '@/hooks/use-fetch';
import { getIssuesForSprint } from '@/actions/issues';
import { BarLoader } from 'react-spinners';
import { useEffect } from 'react';
import IssueCard from '/components/issue-card';
import { toast } from 'sonner';







const SprintBoard = ({sprints, projectId, orgId}) => {

    const [currentSprint, setCurrentSprint] = useState(
        sprints.find((spr)=> spr.status === "ACTIVE") || sprints[0]
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

     const {
    loading: issuesLoading,
    error: issuesError,
    fn: fetchIssues,
    data: issues,
    setData: setIssues,
  } = useFetch(getIssuesForSprint);

  const [filteredIssues, setFilteredIssues] = useState(issues);

useEffect(() => {
  if (currentSprint.id && orgId) {
    fetchIssues(currentSprint.id, orgId);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentSprint.id, orgId]);

    const handleAddIssue = (status) => {
    setSelectedStatus(status);
    setIsDrawerOpen(true);
  };
  
  const handleIssueCreated = () => {
  fetchIssues(currentSprint.id, orgId);
};

  if(issuesError) return <div>Error Loading issues</div>


  const onDragEnd = (result) => {
    if(currentSprint.status === "PLANNED"){
      toast.warning("Start the sprint to update board");
      return;
      
    }
    if(currentSprint.status === "COMPLETED"){
      toast.warning("Cannot update issues in completed sprint");
      return;
    }
    const {destination, source} = result;

    if(!destination){
      return;
    }
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }

    const newOrderedData = [...issues]

    const sourceList = newOrderedData.filter(
      (list) => list.status === source.droppableId
    );
    const destinationList = newOrderedData.filter(
      (list) => list.status === destination.droppableId
    );
    
  }
  if(issuesError) return <div>Error loading issues</div>
  return (
    <div>
      {/*Sprint Manager */}
      <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
      />


      {issuesLoading && (
        <BarLoader className='mt-4' width={"100%"} color="#36d7b7"/>
      )}

      {/*kanban boardd */}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-slate-900 p-4 rounded-lg'>
          {statuses.map((column)=>(
            <Droppable key={column.key} droppableId={column.key}>
              {(provided) => {
                return<div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='space-y-2'
                >
                  <h3 className='font-semibold mb-2 text-center'>{column.name}</h3>

                  {/*Issue */}
                  {issues?.filter((issue) => issue.status ===column.key)
                  .map((issue, index)=>(
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id}
                      index={index}
                      >
                        {(provided)=>{
                          return(
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              >

                                <IssueCard issue={issue}/>
                            </div>
                          )
                        }}
                      </Draggable>
                  ))}

                  {provided.placeholder}
                  {column.key === "TODO" && currentSprint.status !== "COMPLETED" &&
                  (
                    <Button variant="ghost" className="w-full" onClick={()=>
                      handleAddIssue(column.key)
                    }>
                      <Plus className='mr-2 h-4 w-4' />
                      Create Issue
                    </Button>
                  )

                  }
                </div>
              }}
            </Droppable>
          ))}
          
        </div>
      </DragDropContext>

      <IssueCreationDrawer
      isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sprintId={currentSprint.id}
        status={selectedStatus}
        projectId={projectId}
        onIssueCreated={handleIssueCreated}
        orgId={orgId}
      />
    </div>
  )
}

export default SprintBoard
