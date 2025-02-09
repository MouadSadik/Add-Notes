"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import AddNote from './AddNote'

const Content = () => {

    const [search, setSearch] = useState("")

  return (
    <div className='flex flex-col w-full px-20'>
        <div className='flex justify-between w-full'>
            <div className=''>
                <h2 className="text-xl font-bold text-blue-600">Welcome back! </h2>
                <p className="text-gray-500">Here's a list of your notes</p>
            </div>
            <UserButton  showName />
        </div>
        <div className='mt-16 flex items-center justify-around'>
            <Input className='w-80 hover:border-blue-600 border-blue-500 ' type='text' placeholder='Search Note'/>
            <AddNote />
        </div>
    </div>
  )
}

export default Content