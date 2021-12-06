import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../utils/mongodb';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
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

            return { name, email, id: existingUser._id };
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
    async jwt({ token, user, account }) {
      if (user) {
        token.user = { ...user, provider: account.provider };
      }
      return token;
    },
  },
  pages: {
    signIn: '/account',
  },
  secret: process.env.NEXT_AUTH_TOKEN_SECRET,
});
