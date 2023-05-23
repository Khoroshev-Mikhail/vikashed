

interface Topic {
    id: number
    name: string
}
interface TopicWithConnections {
    id: number
    name: string
    article: Article[]
}

interface Article {
    id: number;
    name: string;
    date: string;
    authorId: string;
    text: string; // |JSON
    author: {
        name?: string;
        role?: string;
        image?: string
    }
};
interface ArticleWithConnections {
    id: number;
    name: string;
    text: string;
    topic: { id: number }[];
};