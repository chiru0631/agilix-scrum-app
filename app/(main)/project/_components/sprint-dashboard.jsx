"use client";

import SprintManager from './sprint-manager'
import React, { useState } from 'react'

const SprintBoard = ({sprints, projectId, orgId}) => {

    const [currentSprint, setCurrentSprint] = useState(
        sprints.find((spr)=> spr.status === "ACTIVE") || sprints[0]
    );
  return (
    <div>
      {/*Sprint Manager */}
      <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
      />

      {/*kanban boardd */}
    </div>
  )
}

export default SprintBoard
