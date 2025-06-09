"use client";
// This component is used to create a user menu with a link to the user's organization page.

import { ChartNoAxesGantt } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import React from 'react'

const UserMenu = () => {
  return (
    <UserButton appearence={{
        elements:{
            avatarBox:'w-10 h-10',
        }
    }}> 
        <UserButton.MenuItems>
            <UserButton.Link 
                label='My Organization'
                labelIcon={<ChartNoAxesGantt size={15}/>}
                href='/onboarding'
            />

            
        </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserMenu;
