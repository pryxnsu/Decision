// /api/question/route.ts

import { NextResponse } from 'next/server';
import { HTTP_RESPONSE_CODE } from '@/lib/constant';
import { createQuestion, getQuestions } from '@/lib/db/queries';
import { createQuestionSchema } from '@/lib/zod/schema';
import { getServerSession } from 'next-auth';
import options from '../auth/[...nextauth]/options';

export async function GET() {
    const questions = await getQuestions();
    return NextResponse.json({ questions }, { status: HTTP_RESPONSE_CODE.SUCCESS });
}

export async function POST(req: Request) {
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: HTTP_RESPONSE_CODE.UNAUTHORIZED });
    }

    const body = await req.json();

    const parsedData = createQuestionSchema.parse(body);

    const { question, questionType, description } = parsedData;

    const newQuestion = await createQuestion(session.user.id, question, questionType, description);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...rest } = newQuestion;

    const result = {
        ...rest,
        username: session.user.username,
    };

    return NextResponse.json({ question: result }, { status: HTTP_RESPONSE_CODE.CREATED });
}
