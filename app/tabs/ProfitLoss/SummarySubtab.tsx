"use client";

import { useEffect, useState } from "react";

export default function SummarySubtab() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("SummarySubtab mounted");
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>
        ProfitLoss → Summary
      </h1>

      <p style={{ marginTop: 10, fontSize: 14 }}>
        This is a logic test. If you see this, your subtab logic works.
      </p>

      <button
        onClick={() => setValue(value + 1)}
        style={{
          marginTop: 20,
          padding: "8px 16px",
          background: "#0f172a",
          color: "white",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Clicks: {value}
      </button>
    </div>
  );
}
