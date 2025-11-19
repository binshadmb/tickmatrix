"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { tabRegistry } from "./tabRegistry";

const MAIN_TABS = ["LiveStatus", "Account", "FeedMode", "Strategy", "ProfitLoss", "Compliance", "Settings"];
const SUB_TABS_BY_MAIN: Record<string, string[]> = {
  LiveStatus: ["OverviewLanding","SystemHealth","FeedDiagnostics","TradeFlow","OrderQueue","ExecutionLatency","NetworkMonitor","CoreLogs","LiveMetrics"],
  Account: ["OverviewLanding","Exposure","Equity","Margin","CDSS","Audit","Positions","Reports","Settings"],
  FeedMode: ["OverviewLanding","MetricsLab","RefineryFilterEngine","FeedWatchlist","InstitutionalFlowMap","Diagnostics","FeedEvents","LatencyMap","TickMonitor"],
  Strategy: ["OverviewLanding","Builder","Backtest","Optimizer","ExecutionCluster","SLLogic","Performance","Settings","TraceLogs"],
  ProfitLoss: ["OverviewLanding","Daily","Weekly","Breakdown","Charts","Insights","Ledger","Statements","Summary"],
  Compliance: ["OverviewLanding","Rules","Violations","Review","AuditTrail","EventLog","RegulatoryMap","SystemFlags","TradeChecks"],
  Settings: ["OverviewLanding","System","Alerts","Themes","Integrations","Preferences","DeveloperMode","Labs","Shortcuts"],
};

const THEMES: string[][] = [
  ["#4c0ce7","#9d1dea","#ff7a18","#ffd200"],
  ["#3c6cf5","#5da8ff","#36d1dc","#5b86e5"],
  ["#ff6b6b","#f06595","#845ef7","#5c7cfa"],
  ["#00b09b","#96c93d","#f6d365","#ffaf7b"],
  ["#ff9a9e","#fecfef","#f6d365","#fda085"],
  ["#2b5876","#4e4376","#1e3c72","#2a5298"],
  ["#0ba360","#3cba92","#00d4ff","#4facfe"],
];

// Mapping colorSet dropdown to live color array
const colorMap: Record<string, string[]> = {
  set1: ["#ff7a18","#ffd200","#4c0ce7","#9d1dea"],
  set2: ["#5da8ff","#36d1dc","#3c6cf5","#5b86e5"],
  set3: ["#ff6b6b","#f06595","#845ef7","#5c7cfa"],
  set4: ["#00b09b","#f6d365","#96c93d","#ffaf7b"],
  set5: ["#ff9a9e","#f6d365","#fecfef","#fda085"],
  set6: ["#2b5876","#1e3c72","#4e4376","#2a5298"],
  set7: ["#0ba360","#00d4ff","#3cba92","#4facfe"],
};

const tabStyle = (active: boolean): React.CSSProperties => ({
  flex: "1 1 0",
  minWidth: 0,
  maxWidth: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 10px",
  borderRadius: 8,
  background: active ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.14)",
  border: active ? "2px solid #fff" : "1px solid transparent",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
  cursor: "pointer",
});

/* ---------------- Drag hook ---------------- */
function useFreeDragWithBoundsAndSave(ref: React.RefObject<HTMLElement>, enabled: boolean, storageKey: string, boundsRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    const bounds = boundsRef.current;
    if (!el || !bounds) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const { x, y } = JSON.parse(saved);
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      } catch {}
    }

    el.style.touchAction = "none";
    el.style.userSelect = "none";

    let pointerId: number | null = null;
    let startX = 0, startY = 0, originLeft = 0, originTop = 0;
    let dragging = false, dragStarted = false;
    const DRAG_THRESHOLD = 8;

    const onDown = (e: PointerEvent) => {
      if (!enabled) return;
      if ("button" in e && e.button !== 0) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      originLeft = el.offsetLeft || 0;
      originTop = el.offsetTop || 0;
      dragging = true;
      dragStarted = false;
      try { el.setPointerCapture?.(pointerId); } catch {}
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (pointerId !== null && e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!dragStarted) {
        if (Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;
        dragStarted = true;
        el.dataset.dragging = "1";
        el.style.cursor = "grabbing";
      }

      const nx = Math.max(0, Math.min(originLeft + dx, bounds.clientWidth - el.clientWidth));
      const ny = Math.max(0, Math.min(originTop + dy, bounds.clientHeight - el.clientHeight));
      el.style.left = `${nx}px`;
      el.style.top = `${ny}px`;
      localStorage.setItem(storageKey, JSON.stringify({ x: nx, y: ny }));
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      dragStarted = false;
      el.dataset.dragging = "0";
      el.style.cursor = enabled ? "grab" : "default";
      try { if (pointerId !== null) el.releasePointerCapture?.(pointerId); } catch {}
      pointerId = null;
    };

    el.addEventListener("pointerdown", onDown, { capture: true });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    el.style.cursor = enabled ? "grab" : "default";
    el.dataset.dragging = "0";

    return () => {
      try { el.removeEventListener("pointerdown", onDown, { capture: true } as any); } catch {}
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [ref, enabled, storageKey, boundsRef]);
}

/* ---------------- CockpitShell ---------------- */
export default function CockpitShell() {
  const [dragEnabled, setDragEnabled] = useState<boolean>(() => {
    const s = localStorage.getItem("dragEnabled");
    return s ? s === "true" : true;
  });
  const [mainTab, setMainTab] = useState<string>("LiveStatus");
  const [subTab, setSubTab] = useState<string>("OverviewLanding");
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number>(() => {
    const s = Number(localStorage.getItem("selectedThemeIndex"));
    return isNaN(s) ? 0 : s;
  });

  const [colorSet, setColorSet] = useState("set1");
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; x: number; y: number } | null>(null);

  const handleColorSetChange = (value: string) => {
    setColorSet(value);
    // Update ribbons live
    const selected = colorMap[value];
    if (selected) {
      document.documentElement.style.setProperty("--main-gradient-start", selected[0]);
      document.documentElement.style.setProperty("--main-gradient-end", selected[1]);
      document.documentElement.style.setProperty("--sub-gradient-start", selected[2]);
      document.documentElement.style.setProperty("--sub-gradient-end", selected[3]);
    }
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!dragEnabled) return;
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY, x: position.x, y: position.y };
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      setPosition({ x: dragStartRef.current.x + dx, y: dragStartRef.current.y + dy });
    };
    const handleMouseUp = () => { setIsDragging(false); dragStartRef.current = null; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp); };
  }, [isDragging, dragEnabled]);

  const zoneRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "auto"; }; }, []);
  useEffect(() => { localStorage.setItem("dragEnabled", dragEnabled ? "true" : "false"); }, [dragEnabled]);
  useEffect(() => { setSubTab(SUB_TABS_BY_MAIN[mainTab][0]); }, [mainTab]);

  useFreeDragWithBoundsAndSave(mainRef, dragEnabled, "mainRibbonPos", zoneRef);
  useFreeDragWithBoundsAndSave(subRef, dragEnabled, "subRibbonPos", zoneRef);

  const selectedColors = colorMap[colorSet] || THEMES[selectedThemeIndex] || THEMES[0];
  const mainGradient = `linear-gradient(90deg, ${selectedColors[0]}, ${selectedColors[1]})`;
  const subGradient = `linear-gradient(90deg, ${selectedColors[2]}, ${selectedColors[3]})`;
  const Component = (tabRegistry?.[mainTab] && tabRegistry[mainTab][subTab]) ?? (() => <div>Missing</div>);

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#f2f4f7", position:"fixed", inset:0, overflow:"hidden", fontFamily:"Inter,sans-serif" }}>
      {/* Drag toggle */}
      <div style={{ position:"fixed", right:20, top:14, zIndex:2000 }}>
        <div style={{ padding:"8px 12px", background:"#0f1724", color:"#fff", borderRadius:12, boxShadow:"0 6px 18px rgba(0,0,0,0.25)", display:"flex", gap:10, alignItems:"center" }}>
          <div style={{ fontWeight:700, fontSize:13 }}>{dragEnabled ? "Drag ON" : "Drag OFF"}</div>
          <label style={{ display:"flex", alignItems:"center", gap:8 }}>
            <input type="checkbox" checked={dragEnabled} onChange={e=>setDragEnabled(e.target.checked)} />
          </label>
        </div>
      </div>

      {/* Top ribbons */}
      <div ref={zoneRef} style={{ position:"relative", width:"100%", height:"17vh", borderBottom:"3px solid #dfe3e8" }}>
        <div ref={mainRef} style={{ position:"absolute", top:10, left:"5%", width:"80%", padding:"8px 12px", borderRadius:14, background:mainGradient, color:"white", boxShadow:"0 6px 18px rgba(0,0,0,0.12)", display:"flex", gap:10, overflow:"hidden", alignItems:"center", zIndex:1300, cursor:dragEnabled?"grab":"default" }}>
          {MAIN_TABS.map(t => <div key={t} style={tabStyle(mainTab===t)} onClick={()=>setMainTab(t)}>{t}</div>)}
        </div>
        <div ref={subRef} style={{ position:"absolute", top:70, left:"5%", width:"80%", padding:"8px 12px", borderRadius:14, background:subGradient, color:"white", boxShadow:"0 6px 18px rgba(0,0,0,0.08)", display:"flex", gap:10, overflow:"hidden", alignItems:"center", zIndex:1290, cursor:dragEnabled?"grab":"default" }}>
          {SUB_TABS_BY_MAIN[mainTab].map(t => <div key={t} style={tabStyle(subTab===t)} onClick={()=>setSubTab(t)}>{t}</div>)}
        </div>
      </div>

      {/* Draggable Color Selector */}
      <div style={{ position:"absolute", transform:`translate(${position.x}px,${position.y}px)`, cursor:isDragging?"grabbing":"grab", zIndex:1400 }} onMouseDown={handleMouseDown}>
        <div className="bg-white border border-gray-300 rounded-md shadow px-3 py-2 text-xs">
          <div className="mb-1 font-semibold text-gray-700">🎨 Color Set ({colorSet})</div>
          <select value={colorSet} onChange={e=>handleColorSetChange(e.target.value)} onMouseDown={e=>e.stopPropagation()} className="bg-transparent text-gray-700 font-semibold outline-none">
            <option value="set1">Gold / Orange / Blue</option>
            <option value="set2">Teal / Purple / Lime</option>
            <option value="set3">Yellow / Green / Red</option>
            <option value="set4">Cyan / Indigo / Rose</option>
            <option value="set5">Amber / Emerald / Indigo</option>
            <option value="set6">Violet / Orange / Sky</option>
            <option value="set7">Blue / Amber / Green</option>
          </select>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding:12, marginTop:"17vh" }}>
        <Suspense fallback={<div>Loading...</div>}><Component /></Suspense>
      </div>
    </div>
  );
}
