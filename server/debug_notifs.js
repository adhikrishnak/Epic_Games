import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Game from "./models/Game.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

async function debug() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    
    // Find users with non-empty library
    const users = await User.find({ library: { $exists: true, $not: { $size: 0 } } });
    console.log(`Found ${users.length} users with games in library.`);
    
    users.forEach(u => {
        console.log(`User: ${u.email}`);
        console.log(`Library size: ${u.library.length}`);
        console.log(`Notifications:`, JSON.stringify(u.notifications, null, 2));
        console.log("-------------------");
    });
    
    process.exit(0);
}

debug();
