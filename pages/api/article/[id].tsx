import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]"

export interface ReqBodyPutArticle {
    name: string;
    text: string;
    isVisible: boolean;
    isPaid: boolean;
    topic: number[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const article = await prisma.article.findUnique({
                where: { id: Number(id) },
                include: {
                    topic: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            return res.status(200).json(article);
        } catch (error) {
            console.error('Error fetching article:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'PUT') {
        const session = await getServerSession(req, res, authOptions)
        if(session?.user.role !== 'ADMIN'){
            return res.status(401).json({ message: "Admin only."})
        }
        const { name, text, topic, isVisible, isPaid }: ReqBodyPutArticle = JSON.parse(req.body)

        try {
            const article = await prisma.article.findUnique({
                where: { id: Number(id) },
                include: { topic: true },
            });

            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            const currenttopic = article.topic.map((topic) => topic.id);
            const topicToRemove = currenttopic.filter((currentId) => !topic.includes(currentId));

            const updatedArticle = await prisma.article.update({
                where: { id: Number(id) },
                data: {
                    name: name,
                    text: text,
                    isVisible,
                    isPaid,
                    topic: {
                        set: topic.map(topicId => ({ id: topicId })),
                        disconnect: topicToRemove.map(topicId => ({ id: topicId })),
                    },
                },
                include: { topic: true },
            });

            return res.status(200).json(updatedArticle);
        } catch (error) {
            console.error('Error updating article:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
