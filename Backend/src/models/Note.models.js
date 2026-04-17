import mongoose, { Schema } from "mongoose";

// 1- create a schema
// 2- model based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    }, {
        timestamps: true // auto create of createdAT and UpdatedAt
    }
)

const Note = mongoose.model("Note", noteSchema)

export default Note