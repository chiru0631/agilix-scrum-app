import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import UserAvatar from './user-avatar';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const priorityColors = {
  LOW: "bg-green-600 ",
  MEDIUM: "bg-yellow-300 ",
  HIGH: "bg-orange-400 ",
  URGENT: "bg-red-100 ",
};

const IssueCard = ({
    issue,
    showStatus=false,
    onDelete=() => {},
    onUpdate=() => {},
}) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const created = formatDistanceToNow(new Date(issue.createdAt), {
    addSuffix: true,
    });
  return (<>
    <Card >
  <CardHeader 
   className={`border-t-4 ${priorityColors[issue.priority]} rounded-t-lg`}
   >
    <CardTitle className="text-black">{issue.title}</CardTitle>
  </CardHeader>
  <CardContent className="flex gap-2 -mt-3">
    {showStatus && <Badge>{issue.status}</Badge>}
    <Badge variant="outline" className='-ml-1'>
        {issue.priority}

    </Badge>
    
  </CardContent>
  <CardFooter className="flex flex-col items-start space-y-3">
    <UserAvatar user={issue.assignee}/>

    <div className='text-xs text-gray-400 w-full'>Created {created}</div>
  </CardFooter>
</Card>

    {isDialogOpen && <></>}
    </>
  );
}

export default IssueCard;
