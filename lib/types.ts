

interface Topic {
    id: number
    name: string
    isVisible: boolean
}
interface TopicWithConnections {
    id: number
    name: string
    isVisible: boolean;
    article: {
        id: number;
        name: string;
        date?: string;
        isVisible: boolean;
        isPaid: boolean;
    }[]
}

interface Article {
    id: number;
    name: string;
    date?: string;
    text: string;
    isVisible: boolean;
    isPaid: boolean;
};
interface ArticleWithConnections {
    //Обэедени спредыдущим
    id: number;
    name: string;
    date?: string;
    text: string;
    isVisible: boolean;
    isPaid: boolean;
    topic: { id: number }[];
};