import clientPromise from '../../utils/mongodb';
import bcrypt from 'bcrypt';
import { validateUserDetails } from '../../utils/helpers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db();

    const { name, email, password } = req.body;

    const userDetailsErrors = validateUserDetails(name, email, password);

    if (
      userDetailsErrors.name ||
      userDetailsErrors.email ||
      userDetailsErrors.password
    ) {
      return res.status(422).json({ ...userDetailsErrors, ok: false });
    }
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      res.status(422).json({
        message:
          'This email is already associated with an account. Please sign in.',
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = { name, email, password: hashedPassword };
    const dbResponse = await db.collection('users').insertOne(userData);

    res.status(201).json(dbResponse);
  } else {
    res.status(405).json({ status: `${req.method} method not allowed.` });
  }
}
