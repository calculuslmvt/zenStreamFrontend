import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String, // video url link 
        required: true, 
    },
    thumbnail: {
        type: String,
        required: true, 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
}, {timestamps:true});


videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

