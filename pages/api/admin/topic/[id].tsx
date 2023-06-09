import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]"

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
                where: { id: Number(id) },
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
    } else if (req.method === 'PUT') {
        const session = await getServerSession(req, res, authOptions)
        if(session?.user.role !== 'ADMIN'){
            return res.status(401).json({ message: "Admin only."})
        }
        const { name, connections }: ReqBodyPutTopic = JSON.parse(req.body);

        try {
            const topic = await prisma.topic.findUnique({
                where: { id: Number(id) },
                include: { article: true },
            });

            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            
            const currentConnections = topic.article.map((article) => article.id);
            const connectionsToRemove = currentConnections.filter((currentId) => !connections.includes(currentId));

            const updatedTopic = await prisma.topic.update({
                where: { id: Number(id) },
                data: {
                    name: name,
                    article: {
                        connect: connections.map(connectionId => ({ id: connectionId })),
                        disconnect: connectionsToRemove.map(connectionId => ({ id: connectionId })),
                    },
                },
                include: { article: true },
            });

            return res.status(200).json(updatedTopic);
        } catch (error) {
            console.error('Error updating topic:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

    } else if (req.method === 'DELETE') {
        const session = await getServerSession(req, res, authOptions)
        if(session?.user.role !== 'ADMIN'){
            return res.status(401).json({ message: "Admin only."})
        }

        try {
            const deletedTopic = await prisma.topic.delete({
                where: { 
                    id: Number(id) 
                },
            });

            return res.status(200).json(deletedTopic);
        } catch (error) {
            console.error('Error deleting topic:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
