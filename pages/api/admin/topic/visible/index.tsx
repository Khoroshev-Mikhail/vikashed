import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../../auth/[...nextauth]"

export interface ReqBodyPutVisibleTopic {
    id: number
    isVisible: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
        const session = await getServerSession(req, res, authOptions)
        if(session?.user.role !== 'ADMIN'){
            return res.status(401).json({ message: "Admin only."})
        }
        const { id, isVisible }: ReqBodyPutVisibleTopic = JSON.parse(req.body);

        try {
            const updatedTopic = await prisma.topic.update({
                where: { 
                    id: Number(id) 
                },
                data: {
                    isVisible,
                }
            });

            return res.status(200).json(updatedTopic);
        } catch (error) {
            console.error('Error updating topic:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
