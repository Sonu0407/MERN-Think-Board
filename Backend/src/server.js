import express from "express";
import notesRoutes from "./Routes/notes.Routes.js";
import { connectDB } from "./Config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

//DB connection
connectDB();

// middleware
app.use(express.json()); // this middleware will parse JSON bodies: req.body

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // add in specific path of frontend url http://localhost:5173/
    }),
  );
}

// our simple custom middleware
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} and Req URl is ${req.url}`);
  next(); // go forward and execute next function which is notesRoutes
});

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get((req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running at port 3000`);
});
