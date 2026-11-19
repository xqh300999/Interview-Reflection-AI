export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type HealthResponse = {
  status: string;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
};

export type TranscriptTurnPreview = {
  sequence_no: number;
  speaker_label: string;
  speaker_role: string;
  text: string;
};

export type TranscriptPreviewResponse = {
  total_turns: number;
  question_turns: number;
  speaker_labels: string[];
  preview: TranscriptTurnPreview[];
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Health request failed with ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}

export async function previewTranscript(
  rawText: string,
): Promise<TranscriptPreviewResponse> {
  const response = await fetch(`${apiBaseUrl}/sessions/preview-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      raw_text: rawText,
      language: "zh-CN",
    }),
  });

  if (!response.ok) {
    let message = "解析失败";

    try {
      const error = (await response.json()) as { detail?: string };
      message = error.detail ?? message;
    } catch {
      message = `解析失败，服务返回 ${response.status}`;
    }

    throw new Error(message);
  }

  return response.json() as Promise<TranscriptPreviewResponse>;
}
