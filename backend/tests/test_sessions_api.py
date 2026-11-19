from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_preview_text_returns_turn_statistics() -> None:
    response = client.post(
        "/api/v1/sessions/preview-text",
        json={
            "raw_text": "用户\n我们的项目采用模块化单体。\n\n教授\n为什么不用微服务？",
            "language": "zh-CN",
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total_turns"] == 2
    assert payload["question_turns"] == 1
    assert payload["speaker_labels"] == ["用户", "教授"]


def test_preview_text_rejects_unknown_format() -> None:
    response = client.post(
        "/api/v1/sessions/preview-text",
        json={"raw_text": "没有角色标签的普通文本"},
    )

    assert response.status_code == 422
