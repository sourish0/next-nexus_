import Blog from './models/Blog';  // Import your Blog model
import Trie from './utils/trie';   // Import the Trie class

const trie = new Trie();

const loadBlogTitlesIntoTrie = async () => {
    try {
        // Fetch all blog titles
        const blogs = await Blog.find({}, 'title');
        blogs.forEach(blog => {
            trie.insert(blog.title);
        });
        console.log('Blog titles loaded into Trie');
    } catch (error) {
        console.error('Error loading blog titles into Trie:', error);
    }
};

// Call this function when the server starts
loadBlogTitlesIntoTrie();
