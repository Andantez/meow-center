import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const userData = req.body;
  const dbResponse = await db.collection('users').insertOne(userData);

  res.status(201).json(dbResponse);

}
