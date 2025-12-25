import { HTTP_RESPONSE_CODE } from '@/lib/constant';
import { getQuestionById } from '@/lib/db/queries';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
        throw new Error('Invalid question ID');
    }

    const question = await getQuestionById(id);
    return NextResponse.json({ question }, { status: HTTP_RESPONSE_CODE.SUCCESS });
}
