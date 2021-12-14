import clientPromise from '../../../utils/mongodb';
import sendEmail from '../../../utils/sendEmail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const crypto = await import('crypto');
      const client = await clientPromise;
      const db = await client.db();

      const existingUser = await db.collection('users').findOne({ email });

      // if (!existingUser) {
      //   return res.status(200).json({
      //     success: true,
      //     message: `We've sent an email to ${email} with a link to create new password.`,
      //   });
      // }

      const resetToken = crypto.randomBytes(32).toString('hex');

      const hashedPasswordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
      const tokenExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

      // const updatedExistingUser = await db
      //   .collection('users')
      //   .updateOne(
      //     { email },
      //     { $set: { hashedPasswordResetToken, tokenExpirationTime } }
      //   );

      // not completed yet
      try {
        const info = await sendEmail({
          to: email,
          subject: 'Reset your Meow Portal password',
          text: `Hi ${email} There was a request to change your password!

              If you did not make this request then please ignore this email.

              Otherwise, please click this link to change your password: <a href="http://localhost:3000/account/passwordreset/${hashedPasswordResetToken}">Reset your password</a>`,
          html: `<p>Hi ${email},</p><p>There was a request to change your password!</p><p>If you did not make this request then please ignore this email.</p><p> Otherwise, please click the link to change your password: <a href="http://localhost:3000/account/passwordreset/${hashedPasswordResetToken}">Reset your password</a></p>`,
        });

        res.status(200).json({
          success: true,
          message: `We've sent an email to ${email} with a link to create new password.`,
        });
      } catch (error) {
        const updatedExistingUser = await db
          .collection('users')
          .updateOne(
            { email },
            {
              $set: {
                hashedPasswordResetToken: undefined,
                tokenExpirationTime: undefined,
              },
            }
          );
          res.status(500).json({success: false, message: "Email could not be send"})
      }
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
