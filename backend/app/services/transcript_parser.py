import re

from app.schemas.transcript import TranscriptTurnPreview

SPEAKER_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"^用户$"), "user"),
    (re.compile(r"^AI\s*评审$"), "reviewer"),
    (re.compile(r"^教授$"), "professor"),
    (re.compile(r"^专家$"), "expert"),
    (re.compile(r"^评审$"), "reviewer"),
    (re.compile(r"^面试官$"), "reviewer"),
]


def _speaker_role(line: str) -> str | None:
    normalized = line.strip()
    for pattern, role in SPEAKER_PATTERNS:
        if pattern.match(normalized):
            return role
    return None


def parse_speaker_blocks(raw_text: str) -> list[TranscriptTurnPreview]:
    lines = raw_text.replace("\r\n", "\n").split("\n")
    turns: list[TranscriptTurnPreview] = []

    current_label: str | None = None
    current_role: str | None = None
    current_lines: list[str] = []

    def flush_turn() -> None:
        nonlocal current_label, current_role, current_lines
        text = "\n".join(current_lines).strip()
        if current_label and current_role and text:
            turns.append(
                TranscriptTurnPreview(
                    sequence_no=len(turns) + 1,
                    speaker_label=current_label,
                    speaker_role=current_role,
                    text=text,
                )
            )
        current_label = None
        current_role = None
        current_lines = []

    for line in lines:
        role = _speaker_role(line)
        if role:
            flush_turn()
            current_label = line.strip()
            current_role = role
            current_lines = []
            continue

        if current_role:
            current_lines.append(line)

    flush_turn()
    return turns


def count_question_turns(turns: list[TranscriptTurnPreview]) -> int:
    return sum(1 for turn in turns if "?" in turn.text or "？" in turn.text)
