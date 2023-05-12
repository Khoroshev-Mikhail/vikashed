import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const topics = await prisma.topic.findMany({
        include: {
          article: {
            select: {
              id: true,
              name: true,
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
    const { name } = req.body;
    try {
      const createdTopic = await prisma.topic.create({
        data: {
          name: name as string,
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
