import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "provide a username"],
        unique: true, 
    },
    email: {
        type: String,
        required: [true, "provide a email"]
    },
    password: {
        type: String,
        required: [true, "provide password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    playlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

