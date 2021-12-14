import clientPromise from '../../../../utils/mongodb';
import bcrypt from 'bcrypt';
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const crypto = await import('crypto');
      const client = await clientPromise;
      const db = await client.db();

      const { resettoken } = req.query;
      const hashedPasswordResetToken = crypto
        .createHash('sha256')
        .update(resettoken)
        .digest('hex');
      const existingUser = await db.collection('users').findOne(
        { hashedPasswordResetToken },
        {
          tokenExpirationTime: { $gt: Date.now() },
        }
      );
      if (!existingUser) {
        res
          .status(400)
          .json({ success: false, message: 'Invalid reset token.' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const updatedUser = await db.collection('users').updateOne(
        {
          email: existingUser.email,
        },
        {
          $set: {
            password: hashedPassword,
            hashedPasswordResetToken: undefined,
            tokenExpirationTime: undefined,
          },
        }
      );
      res
        .status(200)
        .json({ success: true, message: 'Password successfully changed.' });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(405).json({succes: true, message: `${req.method} method is not allowed`})
  }
}
