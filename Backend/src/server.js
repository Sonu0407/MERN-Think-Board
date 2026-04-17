import express from "express"
import notesRoutes from "./Routes/notes.Routes.js"
import { connectDB } from "./Config/DB.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

//DB connection
connectDB()

// middleware
app.use(express.json()) // this middleware will parse JSON bodies: req.body
app.use(cors({
    origin:"http://localhost:5173" // add in specific path of frontend url http://localhost:5173/
}))

// our simple custom middleware
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and Req URl is ${req.url}`);
    next(); // go forward and execute next function which is notesRoutes
})

app.use("/api/notes", notesRoutes)

app.listen(PORT, () => {
    console.log(`Server running at port 3000`);
})

// mongodb+srv://sonusapri2004_db_user:CTxDlpQlWJv4DCbg@cluster0.jdbwpg5.mongodb.net/?appName=Cluster0
