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

        if (existingUser) {
          const isAuthenticated = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (isAuthenticated) {
            const { name, email } = existingUser;

            return { name, email, userId: existingUser._id };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: '/account',
  },
  secret: process.env.NEXT_AUTH_TOKEN_SECRET,
});
