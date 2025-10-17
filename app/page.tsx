// import { requireUser } from "@/helpers/requireUser";

import Hero from "@/modules/Hero/Hero";
import Navbar from "@/modules/Navbar/Navbar";

export default async function Home() {
  return(
    <>
    <Navbar/>
    <Hero/>
    </>
  )
  // await requireUser();
}
