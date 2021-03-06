import { connectToDatabase } from '../../utils/mongodb';

const handler = async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { breedId, image, name, description, score } = req.body;
    
    try {
      const dbResponse = await db.collection('mostpopular').findOneAndUpdate(
        { breedId },
        {
          $set: { image, name, description },
          $inc: { score: 1 },
        },
        { upsert: true, returnNewDocument: true }
      );
      res.status(201).json(dbResponse);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).end(`Method ${req.method} is not allowed`);
  }
};

export default handler;
