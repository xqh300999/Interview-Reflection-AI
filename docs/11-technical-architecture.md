# 技术架构 v0.1

- 版本：v0.1
- 日期：2026-11-18
- 目标：支撑两周内完成“文字导入到问题卡生成”的最小闭环
- 部署形态：本地优先、单人维护、可 Docker 运行

## 1. 架构结论

首版采用模块化单体，不采用微服务。

```text
Browser
  |
Next.js Web
  |
FastAPI API
  |
PostgreSQL + pgvector
  |
Processing Worker
  |
LLM / ASR Provider
```

原因：

- 单人开发，微服务会增加部署、网络、监控和调试成本。
- 当前业务边界还在验证，过早拆分容易拆错。
- 问题卡和追问链需要强一致的本地事务。
- 用模块边界而不是网络进程边界隔离业务。

## 2. 组件职责

| 组件 | 职责 |
|---|---|
| Next.js Web | 导入、场次、问题卡、反思、重答和复习界面 |
| FastAPI API | 业务接口、权限、数据校验、任务创建 |
| PostgreSQL | 结构化数据、向量和任务状态 |
| Processing Worker | 轮询任务，执行转写、问题提取和分析 |
| LLM Provider | 结构化问题提取、意图和缺口分析 |
| ASR Provider | 录音转写，后续版本启用 |
| Storage Adapter | 本地私有文件存储，后续可切换 S3 或 MinIO |

## 3. 技术栈

### 3.1 前端

- Next.js App Router。
- TypeScript。
- Tailwind CSS。
- TanStack Query。
- React Hook Form 或等价表单方案。
- lucide-react 图标。
- 可选 shadcn/ui 作为基础组件。

### 3.2 后端

- Python 3.12+。
- FastAPI。
- Pydantic v2。
- SQLAlchemy 2。
- Alembic。
- PostgreSQL 16。
- pgvector。
- pytest。

### 3.3 任务和存储

- PostgreSQL 任务表。
- 独立 Python worker 进程。
- 本地私有文件目录。
- Docker Compose 运行 PostgreSQL、API、worker 和 Web。

### 3.4 外部能力

- LLM 通过提供方接口抽象调用。
- ASR 通过独立接口抽象调用。
- 开发环境提供 `MockLLMProvider` 和 `MockASRProvider`。
- 不允许业务代码直接依赖某一家模型 SDK。

## 4. 目录结构

```text
软件工程-ai面试/
├─ AGENTS.md
├─ README.md
├─ docs/
├─ assets/
│  └─ references/
│     └─ private/
├─ frontend/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ features/
│  │  ├─ lib/
│  │  └─ styles/
│  ├─ tests/
│  └─ package.json
├─ backend/
│  ├─ app/
│  │  ├─ api/
│  │  ├─ core/
│  │  ├─ db/
│  │  ├─ models/
│  │  ├─ schemas/
│  │  ├─ services/
│  │  ├─ providers/
│  │  └─ workers/
│  ├─ alembic/
│  ├─ tests/
│  └─ pyproject.toml
├─ infra/
│  ├─ docker-compose.yml
│  └─ env/
├─ scripts/
├─ storage/
└─ tests/
   └─ e2e/
```

说明：

- `frontend/` 和 `backend/` 分开，避免前端构建工具和后端依赖互相污染。
- 不使用复杂 monorepo 工具，减少单人维护成本。
- `storage/` 只保存运行时私有文件，加入 `.gitignore`。
- `infra/env/` 只放示例配置，不放真实密钥。

## 5. 后端模块

| 模块 | 职责 |
|---|---|
| `api` | 路由、请求校验、响应格式 |
| `core` | 配置、日志、错误、请求 ID、安全 |
| `db` | 连接、迁移、事务 |
| `models` | SQLAlchemy 实体 |
| `schemas` | Pydantic 请求和响应结构 |
| `services` | 场次、转写、问题、反思、复习业务 |
| `providers` | LLM、ASR、Storage 接口和实现 |
| `workers` | 任务轮询、执行、重试和清理 |

模块之间通过服务接口调用，不直接跨模块修改数据。

## 6. 任务系统

首版不引入 Redis 和 Celery，使用 PostgreSQL 任务表加独立 worker。

`processing_jobs` 任务类型：

- `transcription`
- `question_extraction`
- `question_analysis`
- `session_summary`
- `reflection_processing`
- `retry_comparison`

worker 流程：

1. 领取 `queued` 任务。
2. 将状态改为 `running`。
3. 写入开始时间和尝试次数。
4. 执行对应服务。
5. 成功写入结果并改为 `succeeded`。
6. 失败记录错误，按策略重试或标记 `failed`。
7. 超过尝试次数后停止。

领取任务时使用 PostgreSQL 行锁或 `FOR UPDATE SKIP LOCKED`，避免多人或多进程重复执行。

## 7. 文字导入流程

```text
POST /import-text
→ 创建 transcript_turns
→ 创建 question_extraction 任务
→ worker 调用 LLM 提取问题组
→ 创建 question_groups 和 questions
→ 创建 question_analysis 任务
→ worker 批量分析意图和缺口
→ 创建 gaps 和 question_intents
→ 创建 session_summary 任务
→ 生成总结和复习任务
→ 更新 session 为 ready
```

## 8. 录音流程

```text
上传音频
→ 保存私有文件和 MediaAsset
→ 创建 transcription 任务
→ ASR 生成草稿转写
→ 生成 TranscriptCorrection 建议
→ 用户确认修正
→ 重新计算 transcript_version
→ 进入文字分析流程
```

录音分析不直接跳过转写校对，避免把 ASR 错误带入问题分类和缺口分析。

## 9. LLM Provider 抽象

统一接口建议：

```python
class LLMProvider(Protocol):
    async def generate_structured(
        self,
        *,
        task: str,
        system_prompt: str,
        input_payload: dict,
        output_schema: type,
        model: str | None = None,
    ) -> dict:
        ...
```

实现：

- `OpenAICompatibleProvider`
- `LocalModelProvider`
- `MockLLMProvider`

要求：

- 所有输出必须经过 Pydantic 或 JSON Schema 校验。
- 失败时不允许直接把原始模型输出写入数据库。
- 每次调用记录 `ModelUsage`。
- 提示词文件带版本号。

## 10. Storage 抽象

```python
class StorageProvider(Protocol):
    async def put_private(self, key: str, data: bytes) -> str: ...
    async def get_private(self, key: str) -> bytes: ...
    async def delete(self, key: str) -> None: ...
```

实现：

- `LocalStorageProvider`：首版使用。
- `S3StorageProvider`：后续扩展。
- 所有 `storage_key` 不直接暴露给前端。

## 11. 前端架构

- 页面使用服务端渲染或客户端查询均可，首版优先简单实现。
- API 请求统一封装在 `src/lib/api`。
- 功能模块放在 `src/features`，包括 sessions、questions、reflection、review。
- 不在组件中直接拼接系统提示词。
- 所有 AI 结果都显示置信度、依据和用户确认状态。
- 处理中的任务通过轮询任务接口更新状态。

## 12. 配置和安全

环境变量至少包括：

```text
DATABASE_URL
APP_ENV
APP_SECRET
STORAGE_ROOT
LLM_PROVIDER
LLM_API_KEY
LLM_MODEL
ASR_PROVIDER
ASR_API_KEY
MAX_MODEL_CALLS_PER_SESSION
MAX_MODEL_COST_PER_SESSION
```

要求：

- `.env` 不进入 Git。
- 日志不记录密钥、完整转写和录音地址。
- API 错误不返回内部堆栈。
- 私有文件目录不在 Web 静态目录下。
- 删除场次时清理关联文件和数据库记录。

## 13. 测试策略

### 13.1 单元测试

- 转写角色规范化。
- 问题组提取结果校验。
- 缺口分类映射。
- 幂等键生成。
- 成本计算。
- 文件删除。

### 13.2 集成测试

- 导入种子文字样本。
- 使用 MockLLM 生成 20 个题组和 22 张卡。
- 重复请求不产生重复问题卡。
- 任务失败后可重试。
- 私有文件不出现在 Git 和静态资源中。

### 13.3 端到端测试

- 新建场次。
- 导入文字。
- 查看任务进度。
- 打开问题卡。
- 保存语音反思。
- 重答并查看对比。
- 在复习中心看到任务。

## 14. 开发和部署顺序

### Sprint 1

1. 建立前后端和数据库骨架。
2. 建立 `sessions`、`transcript_turns`、`processing_jobs`。
3. 实现文字导入。
4. 使用 MockLLM 生成问题组和问题卡。
5. 实现问题组列表和问题卡详情。
6. 接入真实 LLM。
7. 记录模型调用和成本。

### Sprint 2

1. 语音反思。
2. 重答和对比。
3. 复习任务。
4. 录音上传和异步转写。
5. 转写校对和 AI 修正建议。
6. Docker 部署、测试和演示。

## 15. 首版不采用的方案

- 微服务拆分。
- Redis 和 Celery。
- Kubernetes。
- 复杂权限系统。
- 实时语音流。
- 多模型自动路由平台。
- 原生移动端。

## 16. 明确的技术债

- 本地文件存储在云端部署时需要替换。
- 任务轮询在任务量增大后需要升级。
- 当前只支持单用户或简单账户。
- 初始评估集只有少量样本。
- 真实 ASR 和模型成本尚未完成实测。
