"use client";

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Trie from '@/utils/trie';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [trie, setTrie] = useState<Trie | null>(null);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function loadTrie() {
            const response = await axios.get('/api/posts');
            const posts = response.data.posts;
            localStorage.setItem('posts', JSON.stringify(posts)); // Store posts in localStorage
            const trieInstance = new Trie();
            posts.forEach((post: any) => trieInstance.insert(post.title));
            setTrie(trieInstance);
            setPosts(posts);
        }
        loadTrie();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0 && trie) {
            const results = trie.startsWith(value);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (title: string) => {
        // Manually construct the URL string
        router.push(`/selectblog?title=${encodeURIComponent(title)}`);
    };

    return (
        <div className="relative max-w-md mx-auto mt-8">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search by titles..."
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
            />
            {suggestions.length > 0 && (
                <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
