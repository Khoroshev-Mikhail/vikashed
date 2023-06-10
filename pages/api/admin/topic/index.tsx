import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]";

export interface ReqBodyPostTopic {
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const topics = await prisma.topic.findMany({
                include: {
                    article: {
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

    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        if(session?.user.role !== 'ADMIN'){
            return res.status(401).json({ message: "Admin only."})
        }
        const { name }: ReqBodyPostTopic = JSON.parse(req.body);
        try {
            const createdTopic = await prisma.topic.create({
                data: {
                    name: name,
                },
            });

            return res.status(201).json(createdTopic);
        } catch (error) {
            console.error('Error creating topic:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
