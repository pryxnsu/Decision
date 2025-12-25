import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        role: 'user' | 'admin';
        username: string;
        emailVerified: boolean;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }
    interface Session {
        user: User & DefaultSession['user'];
    }
}
