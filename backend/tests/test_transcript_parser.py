from app.services.transcript_parser import count_question_turns, parse_speaker_blocks


def test_parse_speaker_blocks() -> None:
    raw_text = """
用户
我们采用模块化单体。

AI 评审
为什么不用微服务？

用户
因为团队规模小，成本更低。
""".strip()

    turns = parse_speaker_blocks(raw_text)

    assert len(turns) == 3
    assert turns[0].speaker_role == "user"
    assert turns[1].speaker_label == "AI 评审"
    assert turns[1].speaker_role == "reviewer"
    assert count_question_turns(turns) == 1


def test_parse_unknown_format_returns_empty() -> None:
    assert parse_speaker_blocks("一段没有角色标签的文字") == []
