"use client";

import dynamic from "next/dynamic";

// Dynamically import CockpitShell (client-side only)
const CockpitShell = dynamic(() => import("@/CockpitShell"), { ssr: false });

export default function Page() {
  return <CockpitShell />;
}
