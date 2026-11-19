import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ImportForm } from "./import-form";

export default function NewSessionPage() {
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
            <p className="text-xs font-semibold uppercase text-teal-700">
              Text Import
            </p>
            <h1 className="mt-1 text-xl font-semibold text-slate-950">新建复盘</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-950">先导入一份真实问答</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            首版先验证文字记录。使用“用户 / AI 评审 / 教授 / 专家”作为发言标签，
            每个标签下一行开始写内容。
          </p>
        </div>
        <ImportForm />
      </div>
    </main>
  );
}
