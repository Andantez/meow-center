import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../utils/mongodb';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const client = await clientPromise;
        const db = client.db();

        const existingUser = await db
          .collection('users')
          .findOne({ email: credentials.email });
        // console.log("this are the credentials",credentials)

        const isAuthenticated = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );
          console.log(isAuthenticated)
        if (existingUser && isAuthenticated) {

          const { name, email } = existingUser;
          return { name, email };
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/account',
  },
});
