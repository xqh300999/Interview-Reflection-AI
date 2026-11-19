"use client";

import { useEffect, useState } from "react";
import { Activity, AlertCircle, CheckCircle2 } from "lucide-react";

import { getHealth, type HealthResponse } from "@/lib/api";

type HealthState =
  | { kind: "loading" }
  | { kind: "online"; data: HealthResponse }
  | { kind: "offline"; message: string };

export function SystemHealth() {
  const [state, setState] = useState<HealthState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    getHealth()
      .then((data) => {
        if (!cancelled) {
          setState({ kind: "online", data });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            kind: "offline",
            message: error instanceof Error ? error.message : "未知错误",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.kind === "loading") {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Activity className="size-4 animate-pulse" aria-hidden="true" />
        正在检查 API 状态
      </div>
    );
  }

  if (state.kind === "offline") {
    return (
      <div className="flex items-start gap-2 text-sm text-amber-700">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>API 未连接：{state.message}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-teal-700">
      <CheckCircle2 className="size-4" aria-hidden="true" />
      API 正常，版本 {state.data.version}
    </div>
  );
}
