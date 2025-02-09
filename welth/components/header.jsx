import React from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { LayoutDashboard, PenBox } from 'lucide-react'
import { checkUSer } from '@/lib/checkuser'
const Header = async() => {
  await checkUSer()
  return (

    <div className="fixed top-0 w-full backdrop-blur-lg bg-white/80 border-b z-50">
      <nav className='container flex justify-between items-center py-4 mx-auto'>
        <Link href="/">
          <Image src={"/logo.png"} alt='logo icon' width={60} height={600} className='h-12 w-auto object-contain' />
        </Link>
        <div className='flex justify-center space-x-4'>
          <SignedIn>
            <Link href="/transaction/create">
              <Button variant="outline">
                <PenBox size={18} />
                <span className='hidden md:inline'>Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline">
                <LayoutDashboard size={18}/>
                <span className='hidden md:inline'>Dashboard</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{elements:{avatarBox: "w-9 h-9"}}}/>
          </SignedIn>
        </div>
      </nav>
    </div >
  )
}

export default Header
