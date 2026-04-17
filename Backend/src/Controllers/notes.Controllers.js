import Note from "../models/Note.models.js"

export const getAllNotes = async (req, res) => {
    try {
        // for getting notes in reverse order || last uploaded note on the top need sort(created: -1)
        const notes = await Note.find().sort({ createdAt: -1 }) // 3,2,1 // -1 will sort in desc. order (newest first)
        // const notes = await Note.find() // gets all notes // 1,2,3
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controllers", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getNoteId = async (req, res) => {
    try {
        const noteId = await Note.findById(req.params.id)

        if (!noteId) {
            return res.status(404).json({message: "Get Note By Id failed"})
        }
        res.status(200).json(noteId)

    } catch (error) {
        console.error("Error in getNoteId controllers", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const addNotes = async (req, res) => {
    try {
        const {title, content} = req.body
        const newNote = new Note({title:title, content:content})
        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        console.error("Error in createNote controllers", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const updateNotes = async (req, res) => {
    try {
        const {title, content} = req.body;
        // console.log(req.params.id);
        
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, 
        {title: title, content:content},    
        {
            new: true,
        });

        // if note id is not found
        if (!updatedNote) {
            return res.status(404).json({message: "Note Not Found"})
        }
        
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in updatingNote controllers", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteThisNote = await Note.findByIdAndDelete(id)

        if (!id) {
            return res.status(404).json({message: "Note Not Found"})
        }

        res.status(200).json(deleteThisNote)
    } catch (error) {
        console.error("Error in DeletingNote controllers", error)
        res.status(500).json({message: "Internal server error"})
    }
}