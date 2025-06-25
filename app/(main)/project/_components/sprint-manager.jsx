"use client";

import React, { useState } from 'react'
import { isBefore, isAfter } from 'date-fns';

const SprintManager = ({sprint, setSprint, sprints, projectId}) => {

    const [status, setStatus] = useState(sprint.status);
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const now = new Date();
  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";   
    const canEnd = status === "ACTIVE";


  return <>
  <div>
    
  </div>
  </>
}

export default SprintManager;
