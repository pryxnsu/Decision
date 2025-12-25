import { count, desc, DrizzleQueryError, eq } from 'drizzle-orm';
import { db } from '.';
import { Question, question, response, user } from './schema';
import { DatabaseError } from 'pg';

export async function createUser(
    name: string,
    username: string,
    email: string,
    emailVerified: boolean,
    role: 'user' | 'admin'
) {
    try {
        const [u] = await db
            .insert(user)
            .values({
                name,
                username,
                email,
                emailVerified,
                role,
            })
            .returning();
        return u;
    } catch (err: unknown) {
        console.error('[DB Error] Failed to create user', err);
        throw err;
    }
}

export async function getUserByEmail(email: string) {
    try {
        const [u] = await db.select().from(user).where(eq(user.email, email));
        return u;
    } catch (err: unknown) {
        console.error('[DB Error] Failed to get user by email', err);
        throw err;
    }
}

export async function createQuestion(userId: string, ques: string, questionType: string, description: string) {
    try {
        const [q] = await db
            .insert(question)
            .values({
                userId,
                question: ques,
                questionType,
                description,
            })
            .returning();
        return q;
    } catch (err: unknown) {
        console.error('[DB Error] in create question', err);
        throw err;
    }
}

export async function getQuestions() {
    try {
        return await db
            .select({
                id: question.id,
                question: question.question,
                description: question.description,
                username: user.username,
                createdAt: question.createdAt,
                questionType: question.questionType,
                responses: count(response.id),
            })
            .from(question)
            .leftJoin(user, eq(question.userId, user.id))
            .leftJoin(response, eq(question.id, response.questionId))
            .groupBy(question.id, user.id)
            .orderBy(desc(question.createdAt));
    } catch (err: unknown) {
        console.error('[DB Error] Failed to get questions', err);
        throw err;
    }
}

export async function getQuestionById(id: string): Promise<Question> {
    try {
        const [q] = await db.select().from(question).where(eq(question.id, id));
        return q;
    } catch (err: unknown) {
        console.error('[DB Error] Failed to get question by Id', err);
        throw err;
    }
}

export async function createResponse(userId: string, questionId: string, res: string): Promise<void> {
    try {
        await db
            .insert(response)
            .values({
                userId,
                questionId,
                response: res,
            })
            .returning();
    } catch (err: unknown) {
        console.error('[DB Error] in create response', err);
        throw err;
    }
}

export async function getQuestionsByUserId(userId: string) {
    try {
        return await db
            .select({
                id: question.id,
                question: question.question,
                description: question.description,
                username: user.username,
                createdAt: question.createdAt,
                questionType: question.questionType,
                responses: count(response.id),
            })
            .from(question)
            .leftJoin(user, eq(question.userId, user.id))
            .leftJoin(response, eq(question.id, response.questionId))
            .where(eq(question.userId, userId))
            .groupBy(question.id, user.id)
            .orderBy(desc(question.createdAt));
    } catch (err: unknown) {
        console.error('[DB Error] Failed to get questions by userId', err);
        throw err;
    }
}

export async function getResponsesByQuestionId(questionId: string) {
    try {
        return await db
            .select({
                id: response.id,
                response: response.response,
                username: user.username,
                createdAt: response.createdAt,
            })
            .from(response)
            .leftJoin(user, eq(response.userId, user.id))
            .where(eq(response.questionId, questionId))
            .orderBy(desc(response.createdAt));
    } catch (err: unknown) {
        console.error('[DB Error] Failed to get responses by questionId', err);
        throw err;
    }
}
