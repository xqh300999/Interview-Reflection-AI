# Interview Reflection API

答辩错题本的后端 API。

## 开发

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -e ".[dev]"
.\.venv\Scripts\python -m uvicorn app.main:app --reload
```

访问：

- API: http://127.0.0.1:8000
- Swagger: http://127.0.0.1:8000/docs
- 健康检查: http://127.0.0.1:8000/api/v1/health

## 测试

```powershell
.\.venv\Scripts\python -m pytest -q
.\.venv\Scripts\python -m ruff check app tests
```

## 当前接口

- `GET /api/v1/health`
- `POST /api/v1/sessions/preview-text`

文字预览接口目前只识别发言角色、发言数量和疑似问题数量，不保存数据，也不调用大模型。
