import { getCurrentUser } from "@/helpers/getCurrentUser";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import OrderHistory from "@/modules/OrderHistroy";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/sign-in");

  const [userRecord] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!userRecord) {
    await auth.api.signOut({ headers: await headers() });
    redirect("/sign-in");
  }

  if (userRecord.role === "admin") {
    redirect("/admin");
  }
  const result = await getCurrentUser();
  if (!result.success) redirect("/sign-in");

  const userId = result.user.id;

  const allOrders = await db.query.orders.findMany({
    where: (fields, { eq, ne, isNotNull, and }) =>
      and(
        eq(fields.userId, userId),
        isNotNull(fields.walletAddress),
        ne(fields.walletAddress, ""),
        isNotNull(fields.txId),
        ne(fields.txId, ""),
        isNotNull(fields.telegramName),
        ne(fields.telegramName, ""),
        ne(fields.depositAddress, ""),
        ne(fields.depositQrCodeUrl, "")
      ),
    orderBy: (order, { desc }) => desc(order.createdAt),
  });

  return <OrderHistory allOrders={allOrders} from="search-results" />;
};

export default page;
