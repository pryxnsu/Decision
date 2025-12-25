// /api/respones/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { HTTP_RESPONSE_CODE } from '@/lib/constant';
import { getServerSession } from 'next-auth';
import { createResponseSchema } from '@/lib/zod/schema';
import { createResponse, getResponsesByQuestionId } from '@/lib/db/queries';
import options from '../auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: HTTP_RESPONSE_CODE.UNAUTHORIZED });
    }

    const body = await req.json();
    const parsedData = createResponseSchema.parse(body);

    await createResponse(session.user.id, parsedData.questionId, parsedData.response);

    return NextResponse.json({ message: 'Response created successfully' }, { status: HTTP_RESPONSE_CODE.SUCCESS });
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: HTTP_RESPONSE_CODE.UNAUTHORIZED });
    }

    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
        return NextResponse.json({ message: 'Question ID is required' }, { status: HTTP_RESPONSE_CODE.BAD_REQUEST });
    }

    const responses = await getResponsesByQuestionId(questionId);

    return NextResponse.json({ responses }, { status: HTTP_RESPONSE_CODE.SUCCESS });
}
