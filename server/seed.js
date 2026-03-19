import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "./models/Game.js";
import User from "./models/User.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from "fs";

dotenv.config({ path: path.join(__dirname, ".env") });

const adminUser = {
    firstName: "System",
    lastName: "Admin",
    displayName: "Admin",
    email: "admin@epic.com",
    password: "admin",
    role: "admin",
};

// Read games from public/games.json
const gamesFilePath = path.join(__dirname, "../public/games.json");
let gamesData = fs.readFileSync(gamesFilePath, "utf-8");

// Strip BOM if present
if (gamesData.charCodeAt(0) === 0xFEFF) {
    gamesData = gamesData.slice(1);
}

const initialGames = JSON.parse(gamesData);

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing games
        await Game.deleteMany({});
        console.log("🗑️  Cleared existing games");

        // Insert seed data
        const insertedGames = await Game.insertMany(initialGames);
        console.log(`🌱 Seeded ${insertedGames.length} games successfully!`);

        // Create Admin User if not exists
        const existingAdmin = await User.findOne({ email: adminUser.email });
        if (!existingAdmin) {
            await User.create(adminUser);
            console.log("👤 Admin user created: admin@epic.com");
        } else {
            console.log("👤 Admin user already exists");
        }

        insertedGames.forEach((g) => console.log(`   - ${g.title} (${g._id})`));

        await mongoose.disconnect();
        console.log("✅ Done. MongoDB disconnected.");
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
}

seed();
