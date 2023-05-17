interface Topic {
    id: number
    name: string
}
interface TopicWithConnections {
    id: number
    name: string
    article: {
        id: number
        name: string
    }[]
}

interface Article {
    id: number;
    name: string;
    text: string;
};
interface ArticleWithConnections {
    id: number;
    name: string;
    text: string;
    topic: { id: number }[];
};