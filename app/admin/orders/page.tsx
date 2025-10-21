import { requireAdmin } from "@/helpers/requireAdmin";
import { db } from "@/lib/db";
import { orders, OrderSelectType, UserSelectType } from "@/lib/db/schema";
import Order from "@/modules/admin/orders/Order";
import { and, desc, gte, isNotNull, ne } from "drizzle-orm";

type OrderWithUser = (OrderSelectType & {
  user: UserSelectType;
})[];
const Page = async () => {
  await requireAdmin();

  const allOrders: OrderWithUser = await db.query.orders.findMany({
    where: and(
      isNotNull(orders.walletAddress),
      ne(orders.walletAddress, ""),
      isNotNull(orders.txId),
      ne(orders.txId, ""),
      isNotNull(orders.telegramName),
      ne(orders.telegramName, ""),
      gte(orders.toAmount, 500),
      gte(orders.fromAmount, 50),
      ne(orders.depositAddress, ""),
      ne(orders.depositQrCodeUrl, "")
    ),
    with: {
      user: true,
    },
    orderBy: desc(orders.createdAt),
  });
  return <Order allOrders={allOrders} />;
};

export default Page;
