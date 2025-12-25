import { InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, index, varchar } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const user = pgTable(
    'user',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => uuidv7()),
        name: text('name').notNull(),
        username: text('username').notNull().unique(),
        email: text('email').notNull().unique(),
        emailVerified: boolean('email_verified').notNull().default(false),
        role: varchar('role', { enum: ['user', 'admin'] })
            .notNull()
            .default('user'),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at')
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    t => [index('user_email_idx').on(t.email), index('user_username_idx').on(t.username)]
);

export const question = pgTable(
    'question',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => uuidv7()),
        question: text('question').notNull(),
        questionType: text('type').notNull(),
        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        description: text('description'),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at')
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    t => [index('question_user_id_idx').on(t.userId)]
);

export const response = pgTable(
    'response',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => uuidv7()),
        questionId: text('question_id')
            .notNull()
            .references(() => question.id, { onDelete: 'cascade' }),
        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        response: text('response').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at')
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    t => [index('response_question_id_idx').on(t.questionId), index('response_user_id_idx').on(t.userId)]
);

export type User = InferSelectModel<typeof user>;
export type Question = InferSelectModel<typeof question>;
export type Response = InferSelectModel<typeof response>;
