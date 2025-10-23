import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: roleEnum("role").default("user"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  lastUpdatedAt: timestamp("last_updated_at").defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const orderTokenEnum = pgEnum("order_enum", ["usdt"]);
export const orderNetworkEnum = pgEnum("order_network", ["trc20"]);
export const orderStatusEnum = pgEnum("order_status", [
  "submitted",
  "pending",
  "rejected",
  "success",
]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),

  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  token: orderTokenEnum("token").notNull(),

  network: orderNetworkEnum("network"),

  walletAddress: text("wallet_address"),
  telegramName: text("telegram_name"),

  fromAmount: numeric("from_amount", { mode: "number" }),
  toAmount: numeric("to_amount", { mode: "number" }),
  conversionRate: numeric("conversion_rate", { mode: "number" }),

  depositAddress: text("deposit_address"),
  depositQrCodeUrl: text("deposit_qr_code_url"),

  txId: text("tx_id"),
  paymentProofUrl: text("payment_proof_url"),

  status: orderStatusEnum("status").default("submitted").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const systemSettings = pgTable("system_settings", {
  id: text("id")
    .primaryKey()
    .$default(() => "system"),
  depositAddress: text("deposit_address").notNull(),
  supportUsername: text("support_username"),
  depositQrCodeUrl: text("deposit_qr_code_url").notNull(),
  conversionRate: numeric("conversion_rate", { mode: "number" }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderRelations = relations(orders, ({ one }) => ({
  user: one(user, {
    fields: [orders.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  many: many(orders),
}));

export type UserSelectType = InferSelectModel<typeof user>;
export type UserInsertType = InferInsertModel<typeof user>;

export type OrderSelectType = InferSelectModel<typeof orders>;
export type OrderInsertType = InferInsertModel<typeof orders>;

export type SystemSettingSelectType = InferSelectModel<typeof systemSettings>;

export type FaqsSelectType = InferSelectModel<typeof faqs>;
export type FaqsInsertType = InferInsertModel<typeof faqs>;
