export interface Book {
    id: string;
    title: string;
    author: string;
    thumbnailUrl: string;
}

export interface GoogleBookItem {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            smallThumbnail: string;
        };
    };
}
