"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserButton } from "@clerk/nextjs";

interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
}

const NotesApp = () => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title || !description || !date) return;
    const newNote: Note = {
      id: Date.now(),
      title,
      description,
      date,
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setDescription("");
    setDate("");
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full px-20">
      {/* Header Section */}
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-xl font-bold text-blue-600">Welcome back! </h2>
          <p className="text-gray-500">Here's a list of your notes</p>
        </div>
        <UserButton showName />
      </div>

      {/* Search and Add Note */}
      <div className="mt-16 flex items-center justify-between">
        <Input
          className="w-80 hover:border-blue-600 border-blue-500"
          type="text"
          placeholder="Search Note"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Note Input Form */}
      <div className="max-w-lg mt-6 p-6 bg-white rounded-lg shadow space-y-4">
        <h2 className="text-lg font-bold">📝 Add a Note</h2>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Enter note description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <Button onClick={addNote} className="w-full bg-blue-600 hover:bg-blue-700">
          Save Note
        </Button>
      </div>

      {/* Display Saved Notes */}
      <h3 className="text-lg font-bold mt-6">📌 Saved Notes</h3>
      <div className="space-y-3 mt-2">
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
                <p className="text-xs text-gray-500 mt-2">📅 {note.date}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesApp;
