// import { connectToDatabase } from '../../utils/mongodb';
import clientPromise from '../../utils/mongodb';

const handler = async (req, res) => {
  // const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const { breedId, image, name, description } = req.body;

    try {
      const dbResponse = await db.collection('mostpopular').findOneAndUpdate(
        { breedId },
        {
          $set: { breedId, image, name, description },
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
