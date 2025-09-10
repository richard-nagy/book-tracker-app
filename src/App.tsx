import React, { useState } from "react";
import type { Book } from "./common/types";
import BookSearch from "./components/BookSearch";
import SavedBooksList from "./components/SavedBooksList";

const App: React.FC = () => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);

    const handleAddBook = (book: Book) => {
        if (!savedBooks.some(b => b.id === book.id)) {
            setSavedBooks([...savedBooks, book]);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 p-4 sm:p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-center">Book Tracker</h1>
                <BookSearch onAddBook={handleAddBook} />
                <SavedBooksList books={savedBooks} />
            </div>
        </div>
    );
};

export default App;
