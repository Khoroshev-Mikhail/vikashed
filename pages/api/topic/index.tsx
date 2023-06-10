import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]";

export interface ReqBodyPostTopic {
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const session = await getServerSession(req, res, authOptions)
            const topics = await prisma.topic.findMany({
                where: {
                    isVisible: true
                },
                include: {
                    article: {
                        where: {
                            isVisible: true,
                            isPaid: !session?.user.isPremium ? false : undefined
                        },
                        select: {
                            id: true,
                            name: true,
                            text: true,
                            date: true,
                            isPaid: true,
                            isVisible: true
                        },
                    },
                },
            });
            return res.status(200).json(topics);
        } catch (error) {
            console.error('Error fetching topics:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }


    return res.status(405).json({ message: 'Method Not Allowed' });
}
