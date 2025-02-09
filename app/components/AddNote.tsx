"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from '@/components/ui/textarea'

interface Note {
    id: number;
    title: string;
    description: string;
  }

const AddNote = () => {

    const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <Popover >
      <PopoverTrigger asChild>
      <Button className='bg-blue-600 hover:bg-blue-700'>Add Note</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New Note</h4>
            <p className="text-sm text-muted-foreground">
              You can add a note here.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-0">
              <Label htmlFor="width">Title</Label>
              <Input
                className='w-56'
                placeholder='Enter note Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-0">
              <Label htmlFor="maxWidth">Description</Label>
              <Textarea
                className='w-56 h-32'
                placeholder='Enter the note'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <Button  className="w-full bg-blue-600 hover:bg-blue-700">
          Save Note
        </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AddNote