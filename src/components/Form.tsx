import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Post {
    _id?: string;
    creator?: string;
    title: string;
    content: string;
    // tags: string;
    file?: File | null;
}

interface FormProps {
    type: 'Create' | 'Edit';
    post: Post;
    setPost: React.Dispatch<React.SetStateAction<Post>>;
    posting: boolean;
    handlePost: (e: React.FormEvent<HTMLFormElement>) => void;
    className?: string; 
}

export default function Form({ type, post, setPost, posting, handlePost, className }: FormProps) {
  return (
    <section className={`w-full mt-10 bg-white rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {type === 'Create' ? 'Create a New Post' : 'Edit Post'}
      </h2>
      <form onSubmit={handlePost}>
        <div className="flex flex-col px-4 py-6 gap-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium mb-2">Title :</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Title for your Post"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="text-sm font-medium mb-2">Content :</label>
            <Textarea
              id="content"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-40"
              placeholder="Enter Content for your Post"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="file" className="text-sm font-medium mb-2">Upload File :</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setPost({ ...post, file: e.target.files ? e.target.files[0] : null })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {type === 'Edit' && post.file && (
              <p className="text-sm mt-2 text-gray-600">Current File: {post.file.name}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={posting}
              className="bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-300"
            >
              {posting ? `${type}ing...` : `${type} Post`}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
