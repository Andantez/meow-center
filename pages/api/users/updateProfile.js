import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const client = await clientPromise;
    const db = await client.db();

    const { name, email, userId, newPassword, oldPassword } = req.body;
    const u_ObjectId = new ObjectId(req.body.userId);
    const user = await db.collection('users').findOne({ _id: u_ObjectId });
    // console.log(req.body);

    const isUpdatingEmail = email !== user.email;
    const sameName = user.name === name;

    if (isUpdatingEmail) {
      const existingUser = await db.collection('users').findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ succes: false, message: 'Email has already been taken' });
      }
    }

    const updatedUser = await db.collection('users').updateOne(
      { _id: u_ObjectId },
      {
        $set: {
          name,
          email,
        },
      }
    );
    return res.status(200).json({ status: 'success', message: updatedUser });
  }

  if (req.method !== 'PATH') {
    res
      .status(405)
      .json({ status: false, message: `Method ${req.method} is not allowed` });
  }
}
