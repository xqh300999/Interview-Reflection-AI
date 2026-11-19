"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, FileText, LoaderCircle, Play } from "lucide-react";

import { previewTranscript, type TranscriptPreviewResponse } from "@/lib/api";

const sampleText = `用户
本项目采用模块化单体架构。

AI 评审
为什么没有选择微服务？

用户
因为团队规模较小，当前更重要的是稳定交付和本地事务一致性。`;

export function ImportForm() {
  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState<TranscriptPreviewResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const preview = await previewTranscript(rawText);
      setResult(preview);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "解析失败，请稍后重试。",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function fillSample() {
    setRawText(sampleText);
    setResult(null);
    setError("");
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-slate-500" aria-hidden="true" />
            <label htmlFor="raw-text" className="text-sm font-medium text-slate-800">
              问答文字记录
            </label>
          </div>
          <button
            type="button"
            onClick={fillSample}
            className="text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            填入示例
          </button>
        </div>
        <div className="p-5">
          <textarea
            id="raw-text"
            value={rawText}
            onChange={(event) => setRawText(event.target.value)}
            placeholder={"用户\n这里填写发言内容\n\nAI 评审\n这里填写提问内容"}
            className="min-h-72 w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">支持标签：用户、AI 评审、教授、专家、评审、面试官</p>
            <p className="text-xs text-slate-400">{rawText.length.toLocaleString()} 字符</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <p className="text-xs text-slate-500">当前只做解析预览，不会自动调用模型</p>
          <button
            type="submit"
            disabled={isLoading || !rawText.trim()}
            className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isLoading ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
            解析记录
          </button>
        </div>
      </form>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {result && (
        <section className="rounded-lg border border-teal-200 bg-white">
          <div className="flex items-center gap-2 border-b border-teal-100 bg-teal-50 px-5 py-4 text-teal-800">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            <h3 className="text-sm font-semibold">记录解析完成</h3>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-500">发言数量</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">{result.total_turns}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">疑似问题</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">
                {result.question_turns}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">发言角色</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {result.speaker_labels.join("、")}
              </p>
            </div>
          </div>
          <div className="border-t border-slate-200 px-5 py-4">
            <p className="mb-3 text-xs font-medium uppercase text-slate-400">
              发言预览
            </p>
            <div className="space-y-3">
              {result.preview.map((turn) => (
                <div key={turn.sequence_no} className="rounded-md bg-slate-50 px-3 py-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>{turn.sequence_no.toString().padStart(2, "0")}</span>
                    <span className="text-slate-700">{turn.speaker_label}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {turn.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
