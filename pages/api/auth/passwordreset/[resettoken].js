import clientPromise from '../../../../utils/mongodb';
import bcrypt from 'bcrypt';
import { validatePassword } from '../../../../utils/helpers';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const password = req.body.password;
      const isValidPassword = validatePassword(password);
      if (!isValidPassword) {
        res.status(422).json({
          success: false,
          error: 'Invalid Password Criteria',
          message:
            'Your password must be at least 6 characters long, contain at least one number and have a combination of uppercase and lowercase letters.',
        });
        return;
      }
      const crypto = await import('crypto');
      const client = await clientPromise;
      const db = await client.db();

      const { resettoken } = req.query;
      const hashedPasswordResetToken = crypto
        .createHash('sha256')
        .update(resettoken)
        .digest('hex');
      const existingUser = await db.collection('users').findOne({
        hashedPasswordResetToken,
        tokenExpirationTime: { $gt: new Date(Date.now()) },
      });

      if (!existingUser) {
        res.status(401).json({
          success: false,
          error: 'Token Expired',
          message:
            'Your reset link has expired. Please re-enter your email and we will send you new link.',
        });
        return;
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
      res.status(200).json({
        success: true,
        error: null,
        message: 'Password successfully changed.',
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(405).json({
      succes: true,
      error: 'Method not allowed',
      message: `${req.method} method is not allowed`,
    });
  }
}
