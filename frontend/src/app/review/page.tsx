import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="inline-flex size-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            aria-label="返回首页"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase text-teal-700">Review</p>
            <h1 className="mt-1 text-xl font-semibold text-slate-950">复习中心</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <section className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-teal-50 text-teal-700">
            <BookOpenCheck className="size-5" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-950">还没有待复习问题</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            先导入一次问答记录。问题卡和重答流程接入后，这里会显示需要复习的高优先级问题。
          </p>
          <Link
            href="/sessions/new"
            className="mt-5 inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            新建复盘
          </Link>
        </section>
      </div>
    </main>
  );
}
