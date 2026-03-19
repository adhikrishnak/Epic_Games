import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./server/models/User.js";
import Game from "./server/models/Game.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "server/.env") });

async function debug() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    
    const users = await User.find({ "library.0": { $exists: true } });
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
