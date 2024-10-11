"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery?: string;
}
export const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery); // Use initialQuery to set the initial value of the state
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/jobs?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="flex">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded-r-lg hover:bg-blue-800 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};
