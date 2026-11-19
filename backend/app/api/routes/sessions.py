from fastapi import APIRouter, HTTPException

from app.schemas.transcript import (
    TranscriptPreviewRequest,
    TranscriptPreviewResponse,
)
from app.services.transcript_parser import count_question_turns, parse_speaker_blocks

router = APIRouter(prefix="/sessions")


@router.post("/preview-text", response_model=TranscriptPreviewResponse)
async def preview_text(payload: TranscriptPreviewRequest) -> TranscriptPreviewResponse:
    turns = parse_speaker_blocks(payload.raw_text)
    if not turns:
        raise HTTPException(
            status_code=422,
            detail=(
                "没有识别到有效发言。请使用“用户 / AI 评审 / 教授 / 专家”等发言标签，"
                "并将内容放在标签下一行。"
            ),
        )

    speaker_labels = list(dict.fromkeys(turn.speaker_label for turn in turns))
    return TranscriptPreviewResponse(
        total_turns=len(turns),
        question_turns=count_question_turns(turns),
        speaker_labels=speaker_labels,
        preview=turns[:8],
    )
