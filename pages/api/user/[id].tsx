import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export interface ReqBodyUser {
    id: string
    isPremium: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if(session?.user.role !== 'ADMIN'){
        return res.status(401).json({ message: "Admin only."})
    }
    if(req.method === 'PUT'){
        const { id, isPremium } : ReqBodyUser = JSON.parse(req.body);

        try {
            const updatedUser: User | null = await prisma.user.update({
                where: { id },
                data: { isPremium },
            });
            if (updatedUser) {
                return res.status(200).json({ message: 'User isPremium field updated successfully' });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to update user' });
        } finally {
            await prisma.$disconnect();
        }
    }
    return res.status(405).json({ message: 'Method Not Allowed' });

}
