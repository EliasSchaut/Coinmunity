import {
  pgTable,
  varchar,
  integer,
  timestamp,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';

// --- ENUMS ---
export const roleEnum = pgEnum('role', ['admin', 'member']);
export const transactionTypeEnum = pgEnum('transaction_type', [
  'deposit',
  'purchase',
  'transfer',
  'contribution',
]);

// --- Tables ---
export const settings = pgTable('settings', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
});

export const users = pgTable(
  'community_members',
  {
    id: varchar('id', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).unique().notNull(),
    email: varchar('email', { length: 255 }),
    nickname: varchar('nickname', { length: 255 }),
    profileImage: varchar('profile_image', { length: 255 }),
    pin: varchar('pin', { length: 255 }),
    role: roleEnum('role').default('member').notNull(),
    balance: integer('balance').default(0).notNull(),
    joinedAt: timestamp('joined_at').defaultNow().notNull(),
    disabledAt: timestamp('disabled_at'),
  },
);

export const articles = pgTable('articles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  description: varchar('description', { length: 255 }),
  image: varchar('image', { length: 255 }),
  group: varchar('group', { length: 255 }),
  sort: integer('sort'),
  price: integer('price').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

export const transactions = pgTable('transactions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  type: transactionTypeEnum('type').notNull(),
  description: varchar('description', { length: 255 }),
  amount: integer('amount').notNull(),
  quantity: integer('quantity').notNull(),
  sumprice: integer('sumprice').notNull(),
  fromUserId: varchar('from_user_id', { length: 255 }).references(() => users.id),
  toUserId: varchar('to_user_id', { length: 255 }).references(() => users.id),
  articleId: varchar('article_id', { length: 36 }).references(() => articles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type User = typeof users.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;