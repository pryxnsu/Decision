import { NextResponse } from 'next/server';
import { HTTP_RESPONSE_CODE } from '@/lib/constant';
import { getQuestionsByUserId } from '@/lib/db/queries';
import { getServerSession } from 'next-auth';
import options from '../../auth/[...nextauth]/options';

export async function GET() {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: HTTP_RESPONSE_CODE.UNAUTHORIZED });
    }

    try {
        const questions = await getQuestionsByUserId(session.user.id);
        return NextResponse.json({ questions }, { status: HTTP_RESPONSE_CODE.SUCCESS });
    } catch (error) {
        console.error('Failed to fetch user questions:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: HTTP_RESPONSE_CODE.SERVER_ERROR });
    }
}
