import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 40000, // 40s wait time for slower connections
            family: 4,                       // Force IPv4
        };

        console.log("Attempting to connect to MongoDB directly...");

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("Successfully connected to MongoDB");
            return mongoose;
        }).catch((err) => {
            console.error("MongoDB Connection Error Details:", {
                message: err.message,
                code: err.code,
                name: err.name
            });
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error("MongoDB Connection Failed:", e);
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
