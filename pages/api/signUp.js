import clientPromise from '../../utils/mongodb';
import bcrypt from 'bcrypt';
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const userData = { name, email, hashedPassword };
  const dbResponse = await db.collection('users').insertOne(userData);

  res.status(201).json(dbResponse);
}


