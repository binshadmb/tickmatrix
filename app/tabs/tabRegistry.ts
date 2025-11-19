// app/tabs/tabRegistry.ts
import dynamic from "next/dynamic";

export const TAB_REGISTRY: Record<string, Record<string, any>> = {
  LiveStatus: {
    OverviewLanding: dynamic(() => import("./LiveStatus/OverviewLandingSubtab")),
    SystemHealth: dynamic(() => import("./LiveStatus/SystemHealthSubtab")),
    FeedDiagnostics: dynamic(() => import("./LiveStatus/FeedDiagnosticsSubtab")),
    TradeFlow: dynamic(() => import("./LiveStatus/TradeFlowSubtab")),
    OrderQueue: dynamic(() => import("./LiveStatus/OrderQueueSubtab")),
    ExecutionLatency: dynamic(() => import("./LiveStatus/ExecutionLatencySubtab")),
    NetworkMonitor: dynamic(() => import("./LiveStatus/NetworkMonitorSubtab")),
    LiveMetrics: dynamic(() => import("./LiveStatus/LiveMetricsSubtab")),
    CoreLogs: dynamic(() => import("./LiveStatus/CoreLogsSubtab")),
  },

  Account: {
    OverviewLanding: dynamic(() => import("./Account/OverviewLandingSubtab")),
    Exposure: dynamic(() => import("./Account/ExposureSubtab")),
    Equity: dynamic(() => import("./Account/EquitySubtab")),
    Margin: dynamic(() => import("./Account/MarginSubtab")),
    CDSS: dynamic(() => import("./Account/CDSSSubtab")),
    Audit: dynamic(() => import("./Account/AuditSubtab")),
    Reports: dynamic(() => import("./Account/ReportsSubtab")),
    Settings: dynamic(() => import("./Account/SettingsSubtab")),
    CapitalFlow: dynamic(() => import("./Account/CapitalFlowSubtab")),
  },

  FeedMode: {
    OverviewLanding: dynamic(() => import("./FeedMode/OverviewLandingSubtab")),
    MetricsLab: dynamic(() => import("./FeedMode/MetricsLabSubtab")),
    RefineryFilterEngine: dynamic(() => import("./FeedMode/RefineryFilterEngineSubtab")),
    FeedWatchlist: dynamic(() => import("./FeedMode/FeedWatchlistSubtab")),
    InstitutionalFlowMap: dynamic(() => import("./FeedMode/InstitutionalFlowMapSubtab")),
    Diagnostics: dynamic(() => import("./FeedMode/DiagnosticsSubtab")),
    LatencyMap: dynamic(() => import("./FeedMode/LatencyMapSubtab")),
    TickMonitor: dynamic(() => import("./FeedMode/TickMonitorSubtab")),
    FeedEvents: dynamic(() => import("./FeedMode/FeedEventsSubtab")),
  },

  Strategy: {
    OverviewLanding: dynamic(() => import("./Strategy/OverviewLandingSubtab")),
    Builder: dynamic(() => import("./Strategy/BuilderSubtab")),
    Backtest: dynamic(() => import("./Strategy/BacktestSubtab")),
    Optimizer: dynamic(() => import("./Strategy/OptimizerSubtab")),
    SLLogic: dynamic(() => import("./Strategy/SLLogicSubtab")),
    ExecutionCluster: dynamic(() => import("./Strategy/ExecutionClusterSubtab")),
    Performance: dynamic(() => import("./Strategy/PerformanceSubtab")),
    Settings: dynamic(() => import("./Strategy/SettingsSubtab")),
    TraceLogs: dynamic(() => import("./Strategy/TraceLogsSubtab")),
  },

  ProfitLoss: {
    OverviewLanding: dynamic(() => import("./ProfitLoss/OverviewLandingSubtab")),
    Daily: dynamic(() => import("./ProfitLoss/DailySubtab")),
    Weekly: dynamic(() => import("./ProfitLoss/WeeklySubtab")),
    Breakdown: dynamic(() => import("./ProfitLoss/BreakdownSubtab")),
    Charts: dynamic(() => import("./ProfitLoss/ChartsSubtab")),
    Summary: dynamic(() => import("./ProfitLoss/SummarySubtab")),
    Statements: dynamic(() => import("./ProfitLoss/StatementsSubtab")),
    Ledger: dynamic(() => import("./ProfitLoss/LedgerSubtab")),
    Insights: dynamic(() => import("./ProfitLoss/InsightsSubtab")),
  },

  Compliance: {
    OverviewLanding: dynamic(() => import("./Compliance/OverviewLandingSubtab")),
    Rules: dynamic(() => import("./Compliance/RulesSubtab")),
    Violations: dynamic(() => import("./Compliance/ViolationsSubtab")),
    Review: dynamic(() => import("./Compliance/ReviewSubtab")),
    AuditTrail: dynamic(() => import("./Compliance/AuditTrailSubtab")),
    EventLog: dynamic(() => import("./Compliance/EventLogSubtab")),
    TradeChecks: dynamic(() => import("./Compliance/TradeChecksSubtab")),
    SystemFlags: dynamic(() => import("./Compliance/SystemFlagsSubtab")),
    RegulatoryMap: dynamic(() => import("./Compliance/RegulatoryMapSubtab")),
  },

  Settings: {
    OverviewLanding: dynamic(() => import("./Settings/OverviewLandingSubtab")),
    System: dynamic(() => import("./Settings/SystemSubtab")),
    Alerts: dynamic(() => import("./Settings/AlertsSubtab")),
    Themes: dynamic(() => import("./Settings/ThemesSubtab")),
    Integrations: dynamic(() => import("./Settings/IntegrationsSubtab")),
    Preferences: dynamic(() => import("./Settings/PreferencesSubtab")),
    Shortcuts: dynamic(() => import("./Settings/ShortcutsSubtab")),
    DeveloperMode: dynamic(() => import("./Settings/DeveloperModeSubtab")),
    Labs: dynamic(() => import("./Settings/LabsSubtab")),
  },
};
