import { Router } from "express";
import { addNotes, getNoteId, deleteNotes, getAllNotes, updateNotes } from "../Controllers/notes.Controllers.js";

const router = Router()

// list the notes
router.get("/", getAllNotes)

// get note by id
router.get("/:id", getNoteId)

// add notes
router.post("/", addNotes)

// update notes
router.put("/:id", updateNotes)

// delete notes
router.delete("/:id", deleteNotes)

export default router