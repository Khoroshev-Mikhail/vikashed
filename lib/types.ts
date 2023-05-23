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
    text: string; // |JSON
};
interface ArticleWithConnections {
    id: number;
    name: string;
    text: string;
    topic: { id: number }[];
};