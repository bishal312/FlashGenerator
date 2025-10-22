import { requireUser } from "@/helpers/requireUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Million",
  description: "Start your journey of making millions",
};
export default async function Home() {
  await requireUser();
}
