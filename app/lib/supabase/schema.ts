
import { prices, subscriptionStatus, users } from '@/migrations/schema';
import { sql } from 'drizzle-orm';
import { pgTable, timestamp ,text, uuid, jsonb, integer, boolean, foreignKey, pgPolicy } from 'drizzle-orm/pg-core'

//table configuration for postgres , pattern recognition
export  const workspaces = pgTable('workspaces',{
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt:timestamp('created at',{
        withTimezone:true,
        mode:'string'
    }),
    workspaceOwner:uuid('workspace_owner').notNull(),
    title:text('title').notNull(),
    iconId:text('icon_id').notNull(),
    data:text('data'),
    inTrash:text('in_trash'),
    logo:text('logo'),
    banner:text('banner_url')
});

export const folders = pgTable('folders',{
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt:timestamp('created at',{
        withTimezone:true,
        mode:'string'
    }),
    title:text('title').notNull(),
    iconId:text('icon_id').notNull(),
    data:text('data'),
    inTrash:text('in_trash'),
    logo:text('logo'),
    banner:text('banner_url'),
    workspaceId:uuid('workspace_id').references(()=>
        workspaces.id,
        {onDelete:'cascade'}
    )
})

export const files = pgTable('files',{
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt:timestamp('created at',{
        withTimezone:true,
        mode:'string'
    }),
    title:text('title').notNull(),
    iconId:text('icon_id').notNull(),
    data:text('data'),
    inTrash:text('in_trash'),
    logo:text('logo'),
    banner:text('banner_url'),
    workspace_id:uuid('workspace_id').references(()=>
        workspaces.id,
        {onDelete:'cascade'}
    ),
    folderId:uuid('folder_id').references(()=>folders.id,{onDelete:'cascade'})
})


export const subscriptions = pgTable("subscriptions", {
    id: text().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    status: subscriptionStatus(),
    metadata: jsonb(),
    priceId: text("price_id"),
    quantity: integer(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    created: timestamp({ withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
}, (table) => [
    foreignKey({
            columns: [table.priceId],
            foreignColumns: [prices.id],
            name: "subscriptions_price_id_fkey"
        }),
    foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: "subscriptions_user_id_fkey"
        }),
    pgPolicy("Can only view own subs data.", { as: "permissive", for: "select", to: ["public"], using: sql`(( SELECT auth.uid() AS uid) = user_id)` }),
]);