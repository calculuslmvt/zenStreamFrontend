import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String, 
        required: [true, "provide topic name"], 
    },
    thumbnail: {
        type: String,
        required: [true, "provide thumbnail URL"], 
    },
    description: {
        type: String,
        required: [true, "provide description"]
    },
    playlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
    
}, {timestamps:true});


topicSchema.plugin(mongooseAggregatePaginate);

export const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);
