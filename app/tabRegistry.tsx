"use client";

import dynamic from "next/dynamic";

// Loader
const load = (p: string) => dynamic(() => import(`./tabs/${p}`));

export const tabRegistry: Record<string, Record<string, any>> = {

  /* --------------------------------------------------------
     LIVE STATUS
  -------------------------------------------------------- */
  LiveStatus: {
    OverviewLanding: load("LiveStatus/OverviewLandingSubtab"),
    SystemHealth: load("LiveStatus/SystemHealthSubtab"),
    FeedDiagnostics: load("LiveStatus/FeedDiagnosticsSubtab"),
    TradeFlow: load("LiveStatus/TradeFlowSubtab"),
    OrderQueue: load("LiveStatus/OrderQueueSubtab"),
    ExecutionLatency: load("LiveStatus/ExecutionLatencySubtab"),
    NetworkMonitor: load("LiveStatus/NetworkMonitorSubtab"),
    CoreLogs: load("LiveStatus/CoreLogsSubtab"),
    LiveMetrics: load("LiveStatus/LiveMetricsSubtab"),
  },

  /* --------------------------------------------------------
     ACCOUNT
  -------------------------------------------------------- */
  Account: {
    OverviewLanding: load("Account/OverviewLandingSubtab"),
    Exposure: load("Account/ExposureSubtab"),
    Equity: load("Account/EquitySubtab"),
    Margin: load("Account/MarginSubtab"),
    CDSS: load("Account/CDSSSubtab"),
    Audit: load("Account/AuditSubtab"),
    Positions: load("Account/CapitalFlowSubtab"),  // matching your existing file
    Reports: load("Account/ReportsSubtab"),
    Settings: load("Account/SettingsSubtab"),
  },

  /* --------------------------------------------------------
     FEED MODE
  -------------------------------------------------------- */
  FeedMode: {
    OverviewLanding: load("FeedMode/OverviewLandingSubtab"),
    MetricsLab: load("FeedMode/MetricsLabSubtab"),
    RefineryFilterEngine: load("FeedMode/RefineryFilterEngineSubtab"),
    FeedWatchlist: load("FeedMode/FeedWatchlistSubtab"),
    InstitutionalFlowMap: load("FeedMode/InstitutionalFlowMapSubtab"),
    Diagnostics: load("FeedMode/DiagnosticsSubtab"),
    FeedEvents: load("FeedMode/FeedEventsSubtab"),
    LatencyMap: load("FeedMode/LatencyMapSubtab"),
    TickMonitor: load("FeedMode/TickMonitorSubtab"),
  },

  /* --------------------------------------------------------
     STRATEGY
  -------------------------------------------------------- */
  Strategy: {
    OverviewLanding: load("Strategy/OverviewLandingSubtab"),
    Builder: load("Strategy/BuilderSubtab"),
    Backtest: load("Strategy/BacktestSubtab"),
    Optimizer: load("Strategy/OptimizerSubtab"),
    ExecutionCluster: load("Strategy/ExecutionClusterSubtab"),
    SLLogic: load("Strategy/SLLogicSubtab"),
    Performance: load("Strategy/PerformanceSubtab"),
    Settings: load("Strategy/SettingsSubtab"),
    TraceLogs: load("Strategy/TraceLogsSubtab"),
  },

  /* --------------------------------------------------------
     PROFIT & LOSS
  -------------------------------------------------------- */
  ProfitLoss: {
    OverviewLanding: load("ProfitLoss/OverviewLandingSubtab"),
    Daily: load("ProfitLoss/DailySubtab"),
    Weekly: load("ProfitLoss/WeeklySubtab"),
    Breakdown: load("ProfitLoss/BreakdownSubtab"),
    Charts: load("ProfitLoss/ChartsSubtab"),
    Insights: load("ProfitLoss/InsightsSubtab"),
    Ledger: load("ProfitLoss/LedgerSubtab"),
    Statements: load("ProfitLoss/StatementsSubtab"),
    Summary: load("ProfitLoss/SummarySubtab"),
  },

  /* --------------------------------------------------------
     COMPLIANCE
  -------------------------------------------------------- */
  Compliance: {
    OverviewLanding: load("Compliance/OverviewLandingSubtab"),
    Rules: load("Compliance/RulesSubtab"),
    Violations: load("Compliance/ViolationsSubtab"),
    Review: load("Compliance/ReviewSubtab"),
    AuditTrail: load("Compliance/AuditTrailSubtab"),
    EventLog: load("Compliance/EventLogSubtab"),
    RegulatoryMap: load("Compliance/RegulatoryMapSubtab"),
    SystemFlags: load("Compliance/SystemFlagsSubtab"),
    TradeChecks: load("Compliance/TradeChecksSubtab"),
  },

  /* --------------------------------------------------------
     SETTINGS
  -------------------------------------------------------- */
  Settings: {
    OverviewLanding: load("Settings/OverviewLandingSubtab"),
    System: load("Settings/SystemSubtab"),
    Alerts: load("Settings/AlertsSubtab"),
    Themes: load("Settings/ThemesSubtab"),
    Integrations: load("Settings/IntegrationsSubtab"),
    Preferences: load("Settings/PreferencesSubtab"),
    DeveloperMode: load("Settings/DeveloperModeSubtab"),
    Labs: load("Settings/LabsSubtab"),
    Shortcuts: load("Settings/ShortcutsSubtab"),
  },
};
