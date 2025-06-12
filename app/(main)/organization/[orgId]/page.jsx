import React from 'react'

const Organization = ({params}) => {
  const {orgId} = params;
  // This component is used to display the organization page based on the orgId parameter.
  // You can fetch organization details using the orgId and display them here.
    return (
    <div>
        {orgId}
      
    </div>
  )
}

export default Organization;
