import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const ProjectLayout = async ({children}) => {
  return (
    <div className='mx-auto'>
      <Suspense fallback={<spam>Loading Projects...</spam>}>{children}</Suspense>
    </div>
  )
}

export default ProjectLayout
