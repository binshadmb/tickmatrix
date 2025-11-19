'use client';

import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

const tabMap: Record<string, string[]> = {
  "LIVE STATUS": [
    "Overview (Landing)", "System Health", "Feed Diagnostics",
    "Trade Flow", "Order Queue", "Execution Latency",
    "Network Monitor", "Live Metrics", "Core Logs"
  ],
  ACCOUNT: [
    "Overview (Landing)", "Exposure", "Equity", "Margin", "CDSS",
    "Audit", "Reports", "Settings", "Capital Flow"
  ],
  "FEED MODE": [
    "Overview (Landing)", "Metrics Lab", "Refinery Filter Engine",
    "Feed Watchlist", "Institutional Flow Map", "Diagnostics",
    "Latency Map", "Tick Monitor", "Feed Events"
  ],
  STRATEGY: [
    "Overview (Landing)", "Builder", "Backtest", "Optimizer", "SL Logic",
    "Execution Cluster", "Performance", "Settings", "Trace Logs"
  ],
  "PROFIT & LOSS": [
    "Overview (Landing)", "Daily", "Weekly", "Breakdown", "Charts",
    "Summary", "Statements", "Ledger", "Insights"
  ],
  COMPLIANCE: [
    "Overview (Landing)", "Rules", "Violations", "Review", "Audit Trail",
    "Event Log", "Trade Checks", "System Flags", "Regulatory Map"
  ],
  SETTINGS: [
    "Overview (Landing)", "System", "Alerts", "Themes", "Integrations",
    "Preferences", "Shortcuts", "Developer Mode", "Labs"
  ]
};

export default function CockpitShell() {
  const [selectedMainTab, setSelectedMainTab] = useState("LIVE STATUS");
  const [selectedSubTab, setSelectedSubTab] = useState("Overview (Landing)");
  const [dragEnabled, setDragEnabled] = useState(true);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  const mainRibbonRef = useRef<HTMLDivElement>(null);
  const subRibbonRef = useRef<HTMLDivElement>(null);
  const globalSwitchRef = useRef<HTMLLabelElement>(null);

  const mainTabs = Object.keys(tabMap);
  const subTabs = tabMap[selectedMainTab];

  useEffect(() => {
    const savedDrag = localStorage.getItem("dragEnabled");
    setDragEnabled(savedDrag === "true");

    const keys = ["mainRibbon", "subRibbon", "globalSwitch"];
    const loaded: Record<string, { x: number; y: number }> = {};

    keys.forEach((k) => {
      const x = parseInt(localStorage.getItem(`${k}X`) || "0", 10);
      const y = parseInt(localStorage.getItem(`${k}Y`) || "0", 10);
      loaded[k] = { x, y };
    });

    setPositions(loaded);
  }, []);

  const toggleDragState = () => {
    const ns = !dragEnabled;
    setDragEnabled(ns);
    localStorage.setItem("dragEnabled", ns.toString());
  };

  const onDragStop = (key: string, _e: any, data: any) => {
    const next = { ...positions, [key]: { x: data.x, y: data.y } };
    setPositions(next);
    localStorage.setItem(`${key}X`, String(data.x));
    localStorage.setItem(`${key}Y`, String(data.y));
  };

  const getPos = (k: string) => positions[k] || { x: 0, y: 0 };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0e1117",
        color: "#e5e5e5",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
        userSelect: "none"
      }}
    >

      {/* === MAIN RIBBON === */}
      <Draggable nodeRef={mainRibbonRef} position={getPos("mainRibbon")} disabled={!dragEnabled} onStop={(e, d) => onDragStop("mainRibbon", e, d)}>
        <div
          ref={mainRibbonRef}
          style={{
            position: "absolute",
            top: 0,
            left: "4%",
            width: "72%",
            height: "44px",
            background: "linear-gradient(90deg, #0b1f3a, #1c4466, #18a7c9)",
            borderBottomLeftRadius: "14px",
            borderBottomRightRadius: "14px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.42)",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            cursor: "move",
            zIndex: 20
          }}
        >
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedMainTab(tab);
                setSelectedSubTab(tabMap[tab][0]);
              }}
              style={{
                flex: 1,
                height: "100%",
                border: "none",
                background: "transparent",
                color: selectedMainTab === tab ? "#ffffff" : "rgba(255,255,255,0.6)",
                fontWeight: 600,
                letterSpacing: "0.03em",
                fontSize: "13px",
                textTransform: "uppercase",
                position: "relative",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              {tab}

              {selectedMainTab === tab && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "20%",
                    width: "60%",
                    height: "3px",
                    borderRadius: "3px",
                    background: "#20e3ff",
                    boxShadow: "0 0 8px #20e3ff"
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </Draggable>

      {/* === SUBTAB RIBBON === */}
      <Draggable nodeRef={subRibbonRef} position={getPos("subRibbon")} disabled={!dragEnabled} onStop={(e, d) => onDragStop("subRibbon", e, d)}>
        <div
          ref={subRibbonRef}
          style={{
            position: "absolute",
            top: "54px",
            left: "4%",
            width: "72%",
            height: "40px",
            background: "linear-gradient(90deg, #151a3b, #242f73, #305ed2)",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            cursor: "move",
            zIndex: 15
          }}
        >
          {subTabs.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubTab(sub)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                color: selectedSubTab === sub ? "#ffffff" : "rgba(255,255,255,0.5)",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.02em",
                position: "relative",
                cursor: "pointer",
                transition: "0.2s"
              }}
            >
              {sub}

              {selectedSubTab === sub && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "25%",
                    width: "50%",
                    height: "2px",
                    background: "#00d2ff",
                    borderRadius: "2px",
                    boxShadow: "0 0 6px #00d2ff"
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </Draggable>

      {/* === GLOBAL SWITCH === */}
      <Draggable nodeRef={globalSwitchRef} position={getPos("globalSwitch")} disabled={!dragEnabled} onStop={(e, d) => onDragStop("globalSwitch", e, d)}>
        <label
          ref={globalSwitchRef}
          style={{
            position: "fixed",
            top: "12px",
            right: "24px",
            padding: "8px 12px",
            borderRadius: "12px",
            backdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(0,255,255,0.35)",
            color: "#fff",
            fontSize: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            cursor: "move",
            zIndex: 50
          }}
        >
          <input type="checkbox" checked={dragEnabled} onChange={toggleDragState} />
          <span style={{ marginLeft: 6, fontWeight: 600 }}>
            {dragEnabled ? "DRAG ON" : "DRAG OFF"}
          </span>
        </label>
      </Draggable>

      {/* === CONTENT AREA === */}
      <div
        style={{
          position: "absolute",
          top: "110px",
          left: "4%",
          width: "92%",
          height: "calc(100% - 130px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#34d0ff" }}>
            {selectedMainTab} — {selectedSubTab}
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: "#999" }}>
            [Content will be injected later]
          </div>
        </div>
      </div>

    </div>
  );
}
