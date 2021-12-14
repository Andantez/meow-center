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

      if (!existingUser) {
        return res.status(400).json({
          success: false,
          message: `We coudnt send an email to ${email} with a link to create new password.`,
        });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');

      const hashedPasswordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
      const tokenExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

      const updatedExistingUser = await db
        .collection('users')
        .updateOne(
          { email },
          { $set: { hashedPasswordResetToken, tokenExpirationTime } }
        );

      try {
        const info = await sendEmail({
          to: existingUser.email,
          subject: 'Reset your Meow Portal password',
          text: `Hi ${existingUser.name} There was a request to change your password! If you did not make this request then please ignore this email. Otherwise, please click this link to change your password: <a href="http://localhost:3000/account/passwordreset/${resetToken}">Reset your password</a>`,
          html: `<span style="opacity: 0">${Date.now()} </span>
          <p>Hi ${existingUser.name},</p>
          <p>There was a request to change your password!</p>
          <p>If you did not make this request then please ignore this email.</p>
          <p> Otherwise, please click the link to change your password: <a href="http://localhost:3000/account/passwordreset/${resetToken}" clickTracking=off>Reset your password</a></p>
          <span style="opacity: 0">${Date.now()} </span>
          `,
          // span tags are to ensure gmail is not going to trimm the content.
        });

        res.status(200).json({
          success: true,
          message: `We've sent an email to ${email} with a link to create new password.`,
        });
      } catch (error) {
        const updatedExistingUser = await db.collection('users').updateOne(
          { email },
          {
            $set: {
              hashedPasswordResetToken: undefined,
              tokenExpirationTime: undefined,
            },
          }
        );
        res
          .status(500)
          .json({ success: false, message: 'Email could not be send' });
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
