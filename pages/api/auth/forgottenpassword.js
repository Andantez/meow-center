import clientPromise from '../../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const crypto = await import('crypto');
      const client = await clientPromise;
      const db = await client.db();

      const existingUser = await db.collection('users').findOne({ email });

      if (!existingUser) {
        return res.status(200).json({
          success: true,
          message: `We've sent an email to ${email} with a link to create new password.`,
        });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');

      const hashedPasswordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
      const tokenExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

      const updatedUser = await db
        .collection('users')
        .updateOne(
          { email },
          { $set: { hashedPasswordResetToken, tokenExpirationTime } }
        );

      // not completed yet

      res.status(200).json({
        success: true,
        message: `We've sent an email to ${email} with a link to create new password.`,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error', error });
    }
  } else {
    res
      .status(405)
      .json({ success: false, message: `${req.method} method is not allowed` });
  }
}
