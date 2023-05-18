import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]"

export interface ReqBodyPostArticle {
    name: string;
    text: string;
    topics: number[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const articles = await prisma.article.findMany({
                include: {
                    topic: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            return res.status(200).json(articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions)
        if(!session){
            return res.status(401)
        }
        const { name, text, topics }: ReqBodyPostArticle = JSON.parse(req.body);
        try {
            const createdArticle = await prisma.article.create({
                data: {
                    name: name,
                    text: text,
                    topic: {
                        connect: topics.map((id) => ({ id })),
                    },
                },
            });

            return res.status(201).json(createdArticle);
        } catch (error) {
            console.error('Error creating article:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
