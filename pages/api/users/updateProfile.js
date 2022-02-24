import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';
import { validateProfileDetails } from '../../../utils/helpers';
import bcrypt from 'bcrypt';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    if (req.method === 'PATCH') {
      const client = await clientPromise;
      const db = await client.db();

      const { name, email, userId, oldPassword, newPassword } = req.body;
      const u_ObjectId = new ObjectId(userId);
      const existingUser = await db
        .collection('users')
        .findOne({ _id: u_ObjectId });
      const isUpdatingEmail = email !== existingUser.email;
      const dataErrors = validateProfileDetails(
        name,
        email,
        oldPassword,
        newPassword
      ); // validate the data submitted by the user. returns object with errors fields.

      // true if the user submits anything in the password fields
      // their value is checked by validateProfileDetails function.
      const isChangingPassword =
        oldPassword.length > 0 && newPassword.length > 0; // if true we add password property to user object
      const user = {}; // it will contain the updated user data.
      if (isUpdatingEmail) {
        // if the email field is changed  check for existing one
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
          return res
            .status(409)
            .json({ status: false, message: 'Email has already been taken' });
        }
      }

      if (dataErrors.errors) {
        return res.status(422).json({ status: false, data: dataErrors });
      }

      if (isChangingPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 12); //hash the password if user submits data in the password fields and pasased the validations.
        user.password = hashedPassword;
      }

      user.name = name;
      user.email = email;
      const updatedUser = await db.collection('users').updateOne(
        { _id: u_ObjectId },
        {
          $set: user,
        }
      );
      return res.status(200).json({ status: 'success', data: updatedUser });
    }

    if (req.method !== 'PATH') {
      res.status(405).json({
        status: false,
        message: `Method ${req.method} is not allowed`,
      });
    }
  } else {
    res
      .status(401)
      .json({ message: 'You are not authenticated, please sign in first' });
  }
}
