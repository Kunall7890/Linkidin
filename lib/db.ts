import mongoose from "mongoose";

declare global {
    // eslint-disable-next-line no-var
    var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("Missing MONGO_URI in environment");
}

if (!global._mongoose) global._mongoose = { conn: null, promise: null };

const connectDB = async () => {
    if (global._mongoose.conn) {
        // already connected
        return global._mongoose.conn;
    }

    if (!global._mongoose.promise) {
        global._mongoose.promise = mongoose
            .connect(MONGO_URI, {
                // fail fast if server selection fails
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
            })
            .then((m) => {
                console.log("Mongodb connected.");
                return m;
            })
            .catch((err) => {
                global._mongoose.promise = null;
                console.error("Mongodb connection error:", err);
                throw err;
            });
    }

    global._mongoose.conn = await global._mongoose.promise;
    return global._mongoose.conn;
};

export default connectDB;