import {Schema, model, models} from 'mongoose';

const blogSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // tags: {
    //     type: [String],
    //     required: true,
    // },
})

const Blog = models.Blog || model('Blog', blogSchema);
export default Blog;