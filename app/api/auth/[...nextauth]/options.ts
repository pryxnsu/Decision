import { serverEnv } from '@/env/server';
import { createUser, getUserByEmail } from '@/lib/db/queries';
import { generateUsername } from '@/lib/helper';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: serverEnv.GOOGLE_CLIENT_ID,
            clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider === 'google' && profile?.email) {
                    const existingUser = await getUserByEmail(profile.email);

                    if (existingUser) {
                        Object.assign(user, existingUser);
                        return true;
                    } else {
                        const username = generateUsername();

                        const newUser = await createUser(profile.name as string, username, profile.email, true, 'user');

                        if (newUser) {
                            console.log('New user:', newUser.id);
                            Object.assign(user, newUser);
                            return true;
                        }

                        console.error('Failed to create user');
                        return false;
                    }
                }

                return false;
            } catch (error) {
                console.error('SignIn callback error:', error);
                return false;
            }
        },
        async jwt({ user, token }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.username = user.username;
                token.emailVerified = user.emailVerified;
                token.email = user.email;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.username = token.username;
                session.user.emailVerified = token.emailVerified;
                session.user.email = token.email;
                session.user.createdAt = token.createdAt;
                session.user.updatedAt = token.updatedAt;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    secret: serverEnv.NEXTAUTH_SECRET,
};

export default options;
