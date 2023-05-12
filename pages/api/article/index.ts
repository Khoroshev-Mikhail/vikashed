import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

interface Topic {
  id: number;
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const articles = await prisma.article.findMany({
        include: {
          topic: {
            select: {
              id: true,
              name: true,
            }
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
    const { name, text, topics } = req.body;
    try {
      const createdArticle = await prisma.article.create({
        data: {
          name: name as string,
          text: text as string,
          topic: {
            connect: topics.map((id: number) => ({ id })),
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
