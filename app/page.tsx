"use client";

import dynamic from "next/dynamic";

const CockpitShell = dynamic(() => import("@/components/CockpitShell"), {
  ssr: false,
});

export default function Page() {
  return <CockpitShell />;
}
