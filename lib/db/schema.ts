import { InferInsertModel, InferSelectModel } from "drizzle-orm";
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
  telegramName: text("telegram_name").references(() => user.username, {
    onDelete: "cascade",
  }),

  fromAmount: numeric("from_amount"),
  toAmount: numeric("to_amount"),
  conversionRate: numeric("conversion_rate"),

  // Step 5: Deposit info
  depositAddress: text("deposit_address").default(
    "TEVHMmSTFqSxBegY8VvF8dW5n7ADMzQYgv"
  ),
  depositQrCodeUrl: text("deposit_qr_code_url").default(
    "https://u43okacez0.ufs.sh/f/YHiplYZp8xtB0QhyI2lS83TsowO5gWvuJxSmbEK6aXCejkRM"
  ),

  // Step 6: Payment proof
  txId: text("tx_id"), // user-submitted
  paymentProofUrl: text("payment_proof_url"),

  // Status
  status: orderStatusEnum("status").default("submitted").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type UserSelectType = InferSelectModel<typeof user>;
export type UserInsertType = InferInsertModel<typeof user>;
