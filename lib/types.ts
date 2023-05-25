

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
    text: string;
    isVisible: boolean;
    isPaid: boolean;
};
interface ArticleWithConnections {
    //Обэедени спредыдущим
    id: number;
    name: string;
    date: string;
    text: string;
    isVisible: boolean;
    isPaid: boolean;
    topic: { id: number }[];
};