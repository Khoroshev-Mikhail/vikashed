import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import prisma from '../../../lib/prisma';

export interface ResUsers {
    id: string
    isPremium: boolean
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users: Partial<User>[] = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                isPremium: true,
            },
        });

      res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        await prisma.$disconnect();
    }
}
