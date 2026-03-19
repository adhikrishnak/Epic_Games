import express from "express";
import User from "../models/User.js";
import Game from "../models/Game.js";

const router = express.Router();

// GET /api/users - Fetch all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "displayName email profileImage").sort({ displayName: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
});

// GET /api/users/me - Fetch current user's full data (for sync)
router.get("/me", async (req, res) => {
    try {
        const { email } = req.query; // Or use JWT token if implemented
        const user = await User.findOne({ email })
            .populate("library")
            .populate("gifts")
            .populate("wishlist")
            .populate("cart");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user data", error: err.message });
    }
});

// POST /api/users/cart/add
router.post("/cart/add", async (req, res) => {
    try {
        const { email, gameId } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        if (!user.cart.includes(gameId)) {
            user.cart.push(gameId);
            await user.save();
        }
        res.json({ message: "Added to cart", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart", error: err.message });
    }
});

// POST /api/users/cart/remove
router.post("/cart/remove", async (req, res) => {
    try {
        const { email, gameId } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        user.cart = user.cart.filter(id => id.toString() !== gameId);
        await user.save();
        res.json({ message: "Removed from cart", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove from cart", error: err.message });
    }
});

// POST /api/users/wishlist/toggle
router.post("/wishlist/toggle", async (req, res) => {
    console.log("💖 WISHLIST TOGGLE:", req.body);
    try {
        const { email, gameId } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            console.error("❌ User not found for wishlist:", email);
            return res.status(404).json({ message: "User not found" });
        }
        
        const index = user.wishlist.findIndex(id => id.toString() === gameId);
        if (index === -1) {
            user.wishlist.push(gameId);
            console.log(`✅ Added game ${gameId} to wishlist for ${email}`);
        } else {
            user.wishlist.splice(index, 1);
            console.log(`✅ Removed game ${gameId} from wishlist for ${email}`);
        }
        await user.save();
        res.json({ message: "Wishlist updated", wishlist: user.wishlist });
    } catch (err) {
        console.error("🔥 Wishlist error:", err);
        res.status(500).json({ message: "Failed to update wishlist", error: err.message });
    }
});

// POST /api/users/checkout
router.post("/checkout", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email }).populate("cart");
        if (!user) return res.status(404).json({ message: "User not found" });
        
        // Move all items from cart to library (or Gifts if they are meant to be gifts)
        // For this demo, we'll move them to Library
        user.cart.forEach(game => {
            if (!user.library.includes(game._id)) {
                user.library.push(game._id);
            }
        });
        user.cart = [];
        await user.save();
        res.json({ message: "Checkout successful", library: user.library });
    } catch (err) {
        res.status(500).json({ message: "Checkout failed", error: err.message });
    }
});

// POST /api/users/gifts/add
router.post("/gifts/add", async (req, res) => {
    try {
        const { email, gameId } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        if (!user.gifts.includes(gameId)) {
            user.gifts.push(gameId);
            await user.save();
        }
        res.json({ message: "Added to gifts", gifts: user.gifts });
    } catch (err) {
        res.status(500).json({ message: "Failed to add to gifts", error: err.message });
    }
});

// POST /api/users/send-gift - Send a game to a friend
router.post("/send-gift", async (req, res) => {
    console.log("🎁 GIFT ATTEMPT:", req.body);
    try {
        const { senderEmail, recipientEmail, gameId } = req.body;

        if (!senderEmail || !recipientEmail || !gameId) {
            console.error("❌ Missing required fields");
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Use case-insensitive lookup
        const sender = await User.findOne({ email: { $regex: new RegExp(`^${senderEmail}$`, "i") } });
        const recipient = await User.findOne({ email: { $regex: new RegExp(`^${recipientEmail}$`, "i") } });

        if (!sender) {
            console.error(`❌ Sender not found: ${senderEmail}`);
            return res.status(404).json({ message: "Sender not found" });
        }
        if (!recipient) {
            console.error(`❌ Recipient not found: ${recipientEmail}`);
            return res.status(404).json({ message: "Recipient not found" });
        }

        console.log(`✅ Sender: ${sender.displayName}, Recipient: ${recipient.displayName}`);

        // Find game
        const game = await Game.findById(gameId);
        if (!game) {
            console.error(`❌ Game not found: ${gameId}`);
            return res.status(404).json({ message: "Game not found" });
        }
        console.log(`✅ Game to send: ${game.title}`);

        // Remove from sender's gifts
        const originalGiftCount = sender.gifts.length;
        sender.gifts = sender.gifts.filter(id => id.toString() !== gameId);
        if (sender.gifts.length < originalGiftCount) {
            console.log("✅ Removed game from sender's gifts");
        } else {
            console.log("⚠️ Game was not in sender's gifts (already sent?)");
        }
        await sender.save();

        // Add to recipient's library (if not already there)
        const recipientLibraryStrings = recipient.library.map(id => id.toString());
        if (!recipientLibraryStrings.includes(gameId)) {
            recipient.library.push(gameId);
            console.log("✅ Added game to recipient's library");
        } else {
            console.log("ℹ️ Game already in recipient's library");
        }

        // Add notification for the recipient
        const newNotif = {
            from: sender.displayName,
            message: `${sender.displayName} sent u this game as a gift`,
            gameTitle: game.title,
            date: new Date(),
            read: false
        };
        
        recipient.notifications.push(newNotif);
        recipient.markModified('notifications');
        console.log("✅ Pushed notification to recipient");

        await recipient.save();
        console.log("🚀 ALL DONE: Library updated and notification saved!");

        res.status(200).json({ message: "Gift sent successfully!" });
    } catch (err) {
        console.error("🔥 FATAL GIFT ERROR:", err);
        res.status(500).json({ message: "Failed to send gift", error: err.message });
    }
});

// POST /api/users/notifications/clear - Clear all notifications
router.post("/notifications/clear", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        user.notifications = [];
        await user.save();
        res.json({ message: "Notifications cleared" });
    } catch (err) {
        res.status(500).json({ message: "Failed to clear notifications", error: err.message });
    }
});

export default router;
