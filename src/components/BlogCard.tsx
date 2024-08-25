import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';

interface BlogCardProps {
  postId: string;
  username: string;
  userId: string;
  image: string;
  title: string;
  content: string;
  onEdit: () => void;
  onShow: () => void;
  onDelete: () => void;
  isAuthenticated: boolean;
}

export default function BlogCard({
  postId,
  username,
  userId,
  image,
  title,
  content,
  onEdit,
  onShow,
  onDelete,
  isAuthenticated,
}: BlogCardProps) {
  return (
    <Card key={postId} className="rounded-lg shadow-md overflow-hidden mb-6">
      <Image
        src={image}
        alt="Blog Image"
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <CardHeader className="p-4 bg-gray-100">
        <button onClick={onShow}>
          <h3 className="text-2xl font-semibold mb-2 text-gray-800 hover:underline">
            {title}
          </h3>
        </button>
        <p className="text-sm text-gray-600">By {username}</p>
      </CardHeader>
      <CardContent className="p-4 text-gray-700 overflow-hidden h-36">
        <p>{content}</p>
      </CardContent>
      {isAuthenticated && (
        <CardFooter className="flex justify-end p-4 space-x-4 bg-gray-100">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-transparent"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-transparent"
            onClick={onDelete}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
