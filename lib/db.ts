
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error("⚠️ MONGODB_URI is not defined in .env.local");
// }


// declare global {
//   var mongooseCache: {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   };
// }


// if (!global.mongooseCache) {
//   global.mongooseCache = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (global.mongooseCache.conn) return global.mongooseCache.conn;

//   if (!global.mongooseCache.promise) {
//     global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
//       dbName: "finance",
//       bufferCommands: false,
//     });
//   }

//   global.mongooseCache.conn = await global.mongooseCache.promise;
//   return global.mongooseCache.conn;
// }
