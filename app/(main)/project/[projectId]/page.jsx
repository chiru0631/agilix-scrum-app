import React from 'react'
import { getProject } from '@/actions/projects';
import { notFound } from 'next/navigation';
import SprintCreationForm from '../_components/create-sprint';

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
  return <div className='container mx-auto'>
      {/*Sprint Creation*/}
      <SprintCreationForm
      projectTitle={project.name}
      projectId={project.id}
      projectKey={project.key}
      sprintkey={project.sprints?.length +1}
      />

      {/*sprint Board*/}
      {project.sprints.length>0?(
          <></>
      ): <div>Create a sprint from button above</div> }
    </div>
  
};

export default ProjectPage;