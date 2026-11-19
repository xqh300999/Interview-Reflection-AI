# 本地基础设施

启动完整环境：

```powershell
docker compose -f infra/docker-compose.yml up --build
```

服务地址：

- Web: http://localhost:3000
- API: http://localhost:8000
- API 文档: http://localhost:8000/docs
- PostgreSQL: localhost:5432

如果本机没有 Docker，可以分别运行前后端：

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python -m pip install -e ".[dev]"
.\.venv\Scripts\python -m uvicorn app.main:app --reload
```

```powershell
cd frontend
npm install
npm run dev
```
