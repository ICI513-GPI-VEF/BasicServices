/* Página Principal del sitio */
"use client";

import Roadmap from "@/components/Roadmap";
import Welcome from "@/components/Welcome";
import Featured from "@/components/Featured";

export default function Home() {
  return(
    <>
      <Welcome/>
      <Roadmap/>
      <Featured/>
    </>
  )
}