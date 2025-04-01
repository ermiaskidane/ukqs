'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DropDown from '../drop-down'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Menu } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NavbarProps = {
  currentUser: {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null | undefined,
  } | undefined
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  console.log("pathname", pathname)

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
          window.location.reload(); // Force a hard refresh
        },
      },
    });
  }
  return (
    <header className="border-b">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="https://ukqs.org.uk/wp-content/uploads/2025/02/cropped-ukqslogo-191x64.jpg" alt="UKQS Logo" className="h-10 w-auto" width={100} height={100} />
          </Link>
          <nav className="hidden sm:flex gap-6">
            <Link href="/" className={cn("text-sm font-medium hover:underline", pathname === "/" && "text-rose-500")}>
              Home
            </Link>
            <Link href="/verify" className={cn("text-sm  top-2 font-medium  hover:underline", pathname === "/verify" && "text-rose-500")}>
              Verify
            </Link>
            <Link href="/admin/dashboard" className={cn("text-sm font-medium hover:underline", pathname === "/admin/dashboard" && "text-rose-500")}  >
              Admin
            </Link>
          </nav>
            {
            currentUser ? (
              <div className="hidden sm:block">
                <DropDown
                title={currentUser.name}
                trigger={
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={currentUser.image || undefined} alt="user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                }
                >
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    className="flex gap-x-3 px-2 justify-start w-full"
                  >
                    <LogOut />
                    Logout
                  </Button>
                </DropDown>
              </div>
            ) : (
              <div className="hidden sm:block">
                <Link href="/sign-in">
                  <Button 
                    variant="default"
                    size="sm"
                  > 
                    Log in
                  </Button>
                </Link>
              </div>
            )
          }
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu/>
              </SheetTrigger>
              <SheetContent className='w-1/2'>
                <SheetHeader>
                  <SheetTitle className='text-2xl font-bold text-blue-900'>UKQS</SheetTitle>
                  <SheetDescription>
                    Verify your certificate or check your course completion status.
                  </SheetDescription>
                </SheetHeader>
                  <nav className="flex flex-col gap-2 px-4">
                    <Link href="/" className={cn("text-sm text-center font-medium py-2 hover:bg-blue-900 hover:text-white rounded-md", pathname === "/" && "text-rose-500")}>
                      Home
                    </Link>
                    <Link href="/verify" className={cn("text-sm text-center font-medium py-2 hover:bg-blue-900 hover:text-white rounded-md", pathname === "/verify" && "text-rose-500")}>
                      Verify
                    </Link>
                    <Link href="/admin/dashboard" className={cn("text-sm text-center font-medium py-2 hover:bg-blue-900 hover:text-white rounded-md", pathname === "/admin/dashboard" && "text-rose-500")}  >
                      Admin
                    </Link>
                  </nav>
                  <div className="grid gap-2">
                    {/* <h1 className='text-sm text-center font-medium py-2'>Hello</h1> */}
                      {
                        currentUser ? (
                          <div className="px-4">
                            <DropDown
                            title={currentUser.name}
                            trigger={
                              <div className="flex items-center bg-black py-0.5 border-1 rounded-md">
                                <Avatar className="cursor-pointer mx-auto">
                                  <AvatarImage src={currentUser.image || undefined} alt="user" />
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                              </div>
                            }
                            >
                              <Button
                                onClick={onLogout}
                                variant="ghost"
                                className="flex gap-x-3 px-2 justify-start w-full"
                              >
                                <LogOut />
                                Logout
                              </Button>
                            </DropDown>
                          </div>
                        ) : (
                          <div className="">
                            <Link href="/sign-in" className='block w-full px-4' >
                              <Button 
                                variant="default"
                                size="sm"
                                className='w-full rounded-md'
                              > 
                                Log in
                              </Button>
                            </Link>
                          </div>
                        )
                      }
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          {/* <Button variant="outline" size="sm" className="sm:hidden">
            Menu
          </Button> */}
        </div>
      </header>
  )
}

export default Navbar
