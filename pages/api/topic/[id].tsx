import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]"

export interface ReqBodyPutTopic {
    name: string;
    text: string;
    connections: number[];
}

export interface ReqBodyDeleteTopic {
    id:number
}
    
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const topic = await prisma.topic.findUnique({
                where: { 
                    id: Number(id) 
                },
                include: {
                    article: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });

            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }

            return res.status(200).json(topic);
        } catch (error) {
            console.error('Error fetching topic:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }  else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
