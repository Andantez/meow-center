import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import clientPromise from '../../../utils/mongodb';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export default async function auth(req, res) {
  return NextAuth(req, res, {
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
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        authorization: {
          params: {
            scope: 'email,public_profile',
            // auth_type: 'reauthenticate',
          },
        },
      }),
      CredentialsProvider({
        name: 'Credentials',
        async authorize(credentials, req) {
          try {
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
          } catch (error) {
            return null;
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
        if (req.url === '/api/auth/session?update') {
          const client = await clientPromise;
          const db = await client.db();
          const u_ObjectId = new ObjectId(token.user.id);
          const existingUser = await db
            .collection('users')
            .findOne({ _id: u_ObjectId });
          const updatedUser = {
            name: "test",
            email: "test@'gmail.com",
            id: "existingUser._id.toString()",
            provider:"credentials",
          };
          token.user = updatedUser;
          console.log("should print only once")
        }

        if (user) {
          token.user = { ...user, provider: account.provider };
        }
        console.log(token.user)
        return token;
      },
    },
    pages: {
      signIn: '/account',
    },
    secret: process.env.NEXT_AUTH_TOKEN_SECRET,
    debug: true,
  });
}
