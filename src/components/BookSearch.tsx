import type { Book, GoogleBookItem } from "@/common/types";
import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

const noImage = "https://placehold.co/128x192/000000/FFFFFF?text=No+Image";
const searchDebounceTimeout = 250;

interface BookSearchProps {
    onAddBook: (book: Book) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ onAddBook }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<GoogleBookItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearchRef = useRef(
        debounce(async (query: string) => {
            if (!query.trim()) {
                setSearchResults([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            setSearchResults([]);

            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data from Google Books API.");
                }
                const data = await response.json();
                setSearchResults((data.items as GoogleBookItem[]) || []);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        }, searchDebounceTimeout)
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsLoading(true);
        debouncedSearchRef.current(value);
    };

    const handleAddClick = (book: GoogleBookItem) => {
        const newBook: Book = {
            id: book.id,
            title: book.volumeInfo.title || "Untitled",
            author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
            thumbnailUrl: book.volumeInfo.imageLinks?.smallThumbnail || noImage,
        };
        onAddBook(newBook);
        setSearchResults([]);
        setSearchTerm("");
        debouncedSearchRef.current.cancel();
    };

    return (
        <Card className="p-6">
            <CardHeader>
                <CardTitle>Find a Book</CardTitle>
                <CardDescription>
                    Search for a book by title or author to add it to your list.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                    className="flex gap-4"
                >
                    <Input
                        type="text"
                        placeholder="e.g., The Hobbit"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="flex-1"
                    />
                    <Button
                        type="button"
                        disabled={isLoading || searchTerm.length === 0}
                    >
                        {isLoading ? "Searching..." : "Search"}
                    </Button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </CardContent>
            {searchResults.length > 0 && (
                <div className="p-6 pt-0 space-y-4">
                    <h2 className="text-xl font-bold">Search Results</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map(book => (
                            <Card key={book.id}>
                                <div className="flex p-4 items-start">
                                    <img
                                        src={
                                            book.volumeInfo.imageLinks
                                                ?.smallThumbnail || noImage
                                        }
                                        alt={`Cover of ${book.volumeInfo.title}`}
                                        className="w-16 h-24 rounded-md object-cover mr-4"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold truncate mb-1">
                                            {book.volumeInfo.title ||
                                                "Untitled"}
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 truncate">
                                            by{" "}
                                            {book.volumeInfo.authors?.join(
                                                ", "
                                            ) || "Unknown Author"}
                                        </p>
                                        <Button
                                            onClick={() => handleAddClick(book)}
                                        >
                                            Add to List
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default BookSearch;
