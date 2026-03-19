import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    gifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    notifications: [{
        from: { type: String },
        message: { type: String },
        gameTitle: { type: String },
        date: { type: Date, default: Date.now },
        read: { type: Boolean, default: false }
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
