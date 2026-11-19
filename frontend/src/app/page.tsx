import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  FileText,
  Mic2,
  Plus,
  RotateCcw,
} from "lucide-react";

import { SystemHealth } from "@/components/system-health";

const metrics = [
  { label: "待复习问题", value: "0", detail: "还没有复盘记录" },
  { label: "本周已掌握", value: "0", detail: "完成重答后更新" },
  { label: "本次模型调用", value: "--", detail: "接入分析后显示" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase text-teal-700">
              Interview Reflection AI
            </p>
            <h1 className="mt-1 text-xl font-semibold text-slate-950">答辩错题本</h1>
          </div>
          <Link
            href="/sessions/new"
            className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            <Plus className="size-4" aria-hidden="true" />
            新建复盘
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <section className="flex flex-col gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-teal-700">把真实问题留下来</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              面试和答辩结束后，知道下一次该练什么。
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              导入问答记录，提取问题、追问和回答缺口，再用语音反思和重答巩固。
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm text-slate-500">
            <span className="size-2 rounded-full bg-teal-500" aria-hidden="true" />
            Sprint 1 工程骨架
          </div>
        </section>

        <section className="grid gap-4 py-8 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{metric.value}</p>
              <p className="mt-2 text-xs text-slate-400">{metric.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-950">最近复盘</h3>
                <p className="mt-1 text-xs text-slate-500">还没有导入任何记录</p>
              </div>
              <FileText className="size-5 text-slate-400" aria-hidden="true" />
            </div>
            <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
              <div className="flex size-11 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                <Mic2 className="size-5" aria-hidden="true" />
              </div>
              <h4 className="mt-4 font-medium text-slate-900">从一次真实问答开始</h4>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                粘贴转写文本，先验证发言识别和问题提取，再逐步接入录音和语音反思。
              </p>
              <Link
                href="/sessions/new"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                创建第一场复盘
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-950">系统状态</h3>
                <BookOpenCheck className="size-5 text-teal-600" aria-hidden="true" />
              </div>
              <div className="mt-5">
                <SystemHealth />
              </div>
            </div>
            <Link
              href="/review"
              className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-5 transition hover:border-teal-300"
            >
              <div>
                <p className="font-semibold text-slate-950">复习中心</p>
                <p className="mt-1 text-xs text-slate-500">完成一次重答后展示待复习问题</p>
              </div>
              <RotateCcw className="size-5 text-slate-400 transition group-hover:text-teal-600" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
