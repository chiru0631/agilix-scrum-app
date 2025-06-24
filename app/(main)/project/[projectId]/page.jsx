import React from 'react'
import { getProject } from '@/actions/projects';
import { notFound } from 'next/navigation';

const ProjectPage = async (props) => {
  const { projectId } = props.params;
  let project = null;
  try {
    project = await getProject(projectId);
  } catch (err) {
    // If error is "Project not found", show notFound page
    notFound();
  }

  if (!project) {
    notFound();
  }
  return <div>
      {/*Sprint Creation*/}

      {/*sprint Board*/}
      {project.sprints.length>0?(
          <></>
      ): <div>Create a sprint from button above</div> }
    </div>
  
};

export default ProjectPage;