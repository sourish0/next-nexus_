import Blog from './models/Blog';  // Import your Blog model
import User from './models/User';  // Import your User model
import Trie from './utils/trie';   // Import the Trie class

const trie = new Trie();

// Load existing blog titles into the Trie when the server starts
export const loadBlogTitlesIntoTrie = async () => {
    const blogs = await Blog.find({},'title');
    blogs.forEach(blog => {
        trie.insert(blog.title);
    });
};

export const createPost = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If the title isn't already in the Trie, insert it
        if (!trie.search(title)) {
            trie.insert(title);
        }

        // Create the new post
        const newPost = new Blog({
            creator: user._id,
            title,
            content,
        });

        // Save the post
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the post' });
    }
};

// Call loadBlogTitlesIntoTrie when the server starts
loadBlogTitlesIntoTrie();
