from pydantic import BaseModel, Field


class TranscriptPreviewRequest(BaseModel):
    raw_text: str = Field(min_length=1, max_length=200_000)
    language: str = "zh-CN"


class TranscriptTurnPreview(BaseModel):
    sequence_no: int
    speaker_label: str
    speaker_role: str
    text: str


class TranscriptPreviewResponse(BaseModel):
    total_turns: int
    question_turns: int
    speaker_labels: list[str]
    preview: list[TranscriptTurnPreview]
