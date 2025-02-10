"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'

interface Note {
    id: number;
    title: string;
    description: string;
}

const Content = () => {
    const [search, setSearch] = useState<string>("")
    const [notes, setNotes] = useState<Note[]>([])
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const add = () => {
        if (!title.trim() || !description.trim()) return;

        const newNote: Note = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
        };

        setNotes([...notes, newNote])
        setTitle("")
        setDescription("")
    }

    // Load notes from localStorage
    useEffect(() => {
        try {
            const storedNotes = localStorage.getItem("notes")
            if (storedNotes) {
                const parsedNotes = JSON.parse(storedNotes) as Note[]
                setNotes(parsedNotes)
            }
        } catch (error) {
            console.error("Error loading notes from localStorage:", error)
            setNotes([])
        }
    }, [])

    // Save to localStorage
    useEffect(() => {
        try {
            localStorage.setItem("notes", JSON.stringify(notes))
        } catch (error) {
            console.error("Error saving notes to localStorage:", error)
        }
    }, [notes])

    const columns: ColumnDef<Note>[] = [
        { accessorKey: "title", header: "Title" },
        { accessorKey: "description", header: "Description" },
    ];

    const filteredNotes = notes.filter((note) =>
        (note.title || '').toLowerCase().includes((search || '').toLowerCase())
    );

    return (
        <div className='flex flex-col w-full px-20'>
            <div className='flex justify-between w-full'>
                <div className=''>
                    <h2 className="text-xl font-bold text-blue-600">Welcome back!</h2>
                    <p className="text-gray-500">Here's a list of your notes</p>
                </div>
                <UserButton showName />
            </div>
            
            <div className='mt-16 flex items-center justify-around'>
                <Input 
                    className='w-80 hover:border-blue-600 border-blue-500'
                    type='text'
                    placeholder='Search Note'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div>
                    <Popover>
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
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            className='w-56'
                                            placeholder='Enter note Title'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-0">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            className='w-56 h-32'
                                            placeholder='Enter the note'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    
                                    <Button
                                        onClick={add}
                                        className="w-full bg-blue-600 hover:bg-blue-700">
                                        Save Note
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold mt-16">Saved Notes</h3>
                <div className="space-y-3 mt-4">
                    {filteredNotes.length === 0 ? (
                        <p className="text-gray-500 text-center">No notes found.</p>
                    ) : (
                        filteredNotes.map((note) => (
                            <Card key={note.id}>
                                <CardHeader>
                                    <CardTitle>{note.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{note.description}</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Content