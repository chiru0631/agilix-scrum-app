import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'
import UserLoading from './user-loading'

const Header = async () => {

  await checkUser();
  return <header className='container mx-auto '>
    <nav className='py-6 px-4 flex justify-between items-center'>
        <Link href="/">
          <Image 
              src="/logo.png" 
              alt="Agilix Logo" 
              width={200} 
              height={36} 
             className=" object-contain" 
          />

        </Link>
    

    <div className='flex items-center gap-4'>
        <Link href='/project/create'>
          <Button variant="destructive" className={"flex items-center gap-2"}>
            {/* Using lucide-react for the icon */}
            <PenBox size={18}/>
            <span>
              Create Project
            </span>
          </Button>
        </Link>
      <SignedOut>
        <SignInButton forceRedirectUrl="/onboarding">
        <Button variant="outline">Login</Button>
        </SignInButton>

      </SignedOut>

      <SignedIn>
        <UserMenu/>
      </SignedIn>
      </div>
     </nav>

     <UserLoading/>
    </header>
  
}

export default Header
