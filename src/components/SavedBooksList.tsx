import type { Book } from "@/common/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SavedBooksListProps {
    books: Book[];
}

const SavedBooksList: React.FC<SavedBooksListProps> = ({ books }) => {
    return (
        <Card className="p-6">
            <CardHeader>
                <CardTitle>Your Saved Books</CardTitle>
            </CardHeader>
            <CardContent>
                {books.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {books.map(book => (
                            <Card key={book.id}>
                                <div className="flex p-4 items-start">
                                    <img
                                        src={book.thumbnailUrl}
                                        alt={`Cover of ${book.title}`}
                                        className="w-16 h-24 rounded-md object-cover mr-4"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold truncate mb-1">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 truncate">
                                            by {book.author}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                :   <p className="text-center text-zinc-500 dark:text-zinc-400">
                        Your saved books list is empty.
                    </p>
                }
            </CardContent>
        </Card>
    );
};

export default SavedBooksList;
