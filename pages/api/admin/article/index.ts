import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]"

export interface ReqBodyArticle {
    name: string;
    text: string;
    isVisible: boolean;
    isPaid: boolean;
    topics: number[];
}
export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const articles = await prisma.article.findMany({
                select: {
                    name: true,
                    isVisible: true,
                    isPaid: true,
                    text: true,
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
        if(session?.user.role !== 'ADMIN'){
            return res.status(401).json({ message: "Admin only."})
        }
        
        const { name, text, topics, isPaid }: ReqBodyArticle = JSON.parse(req.body);
        try {
            const createdArticle = await prisma.article.create({
                data: {
                    name,
                    text,
                    isPaid,
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
