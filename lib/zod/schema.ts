import z from 'zod';

export const createQuestionSchema = z.object({
    question: z.string().min(5, 'Question must be at least 5 characters'),
    questionType: z.string().min(1, 'Question type is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});

export const createResponseSchema = z.object({
    questionId: z.string().min(1, 'Question ID is required'),
    response: z.string().min(1, 'Response is required'),
});
