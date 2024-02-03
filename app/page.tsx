"use client";
import { Suspense } from "react";

import { DashboardProvider } from "./contexts/DashboardProvider";
import { Dashboard } from "./components/Dashboard";

export default function Home() {
  return (
    <Suspense>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </Suspense>
  );
}
