import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]"

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
            const session = await getServerSession(req, res, authOptions)
            const articles = await prisma.article.findMany({
                where: {
                    isVisible: session?.user.role !== 'ADMIN' ? true : undefined, //если пользовательно не админ, то не видно
                    isPaid: !session?.user.isPremium ? false : undefined, //если пользователь не премиум тогда показываем только те где доступ к статье не платный
                },
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


    return res.status(405).json({ message: 'Method Not Allowed' });
}
