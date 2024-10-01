"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname() 

  const MenuList = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Question', path: '/question' },
    { name: 'Upgrade', path: '/upgrade' },
    { name: 'How it Works', path: '/how-it-works' }
  ]

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
      <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
      
      <ul className=' hidden md:flex  gap-6'>
        {MenuList.map((item, index) => (
          <li
            key={index}
            className={` cursor-pointer transition-all 
              ${pathname === item.path ? 'text-blue-500  font-bold' : 'hover:text-blue-500 hover:font-bold'}`}
          >
            {item.name}
          </li>
        ))}
      </ul>
      
      <UserButton />
    </div>
  )
}

export default Header
