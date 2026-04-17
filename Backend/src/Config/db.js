import mongoose from "mongoose"

export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)

        console.log("✅ MONGODB Connected Successfully! ");
    } catch (error) {
        console.log("❌ Error Connecting MONGODB", error);
        process.exit(1); // exit with failure
    }
}