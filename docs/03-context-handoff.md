# 上下文与聊天交接

- 更新时间：2026-11-17
- 当前阶段：Sprint 0，立项与需求基线
- 项目根目录：`X:\软件工程-ai面试`

## 1. 新聊天启动提示

新开聊天时，将工作目录设置为：

```text
X:\软件工程-ai面试
```

然后可以直接发送：

```text
请先阅读 AGENTS.md、README.md、docs/00-project-charter.md、
docs/02-decision-log.md 和 docs/03-context-handoff.md。
当前处于 Sprint 0，请继续完成需求基线和用户故事，不要直接开始写产品代码。
```

## 2. 项目当前状态

已完成：

- 已初始化 Git 仓库，默认分支为 `main`。
- 已完成 Sprint 0 初始提交：`fadfae9 docs: establish sprint 0 project baseline`。
- 已分析第一份真实答辩样本，形成 22 张种子问题卡。
- 已完成第一版功能需求、非功能需求和样本验收目标。
- 已完成问题卡、追问链、回答、缺口、反思、重答、复习和成本记录的数据模型。
- 已完成文字导入、录音上传、异步转写、局部修正、问题分析和重答的 API 与 AI 流程。
- 已完成首页、导入、场次详情、转写校对、问题卡、反思、重答和复习中心的低保真原型。
- 已完成 Next.js、FastAPI、PostgreSQL、独立 worker 和 Provider 抽象的技术架构。
- 已记录本地 Git 提交身份、远程仓库状态和 GitHub/Gitee 推送方式。
- 已增加正式 Git 流程文件：贡献规范、变更记录、PR 模板、Issue 模板和换行规范。
- 已在 `feat/project-scaffold` 分支建立 Next.js 前端和 FastAPI 后端。
- 已完成 API 健康检查、开发环境 CORS 和前端系统状态展示。
- 已完成文字问答预览接口，能识别角色、发言数和疑似问题数。
- 已用真实种子样本验证文字预览；由于原文件包含重复的发言记录和问答记录，当前识别为约 140 条发言、42 个疑似问题，后续必须加入去重。
- 确定以复盘为核心，现场辅助后置。
- 确定首版用户为应届生和在校生。
- 确定首版场景为学生讲解自己的软件项目。
- 确定单人开发和两周 MVP。
- 形成初步产品构想、竞品分析、问题卡和成本策略。
- 建立项目文档目录和交接机制。

尚未完成：

- 问题卡数据模型。
- 数据库迁移和持久化。
- MockLLM 问题组提取。
- 问题卡列表和详情。
- 语音反思、重答和复习。

## 3. 关键决策摘要

- 不做一个泛化的 AI 面试平台。
- 首版是“学生软件项目答辩错题本”。
- 不把实际面试中的隐藏式答案生成作为功能。
- 产品核心是问题卡、追问链、回答缺口、语音反思、重答和复习。
- 使用低成本异步 AI 流水线，控制单场模型调用和 token。
- 根目录中文，内部代码和文档文件名英文。

## 4. 已有资料

- `README.md`：项目概览和阅读顺序。
- `docs/00-project-charter.md`：项目章程。
- `docs/01-project-vision-and-competition.md`：产品构想、竞品分析、问题分类和完整方案。
- `docs/02-decision-log.md`：关键决策。
- `docs/04-initial-backlog.md`：初始需求池。
- `docs/05-seed-sample-analysis.md`：真实样本分析。
- `docs/06-question-bank-v0.1.md`：22 张种子问题卡。
- `docs/07-requirements-baseline.md`：第一版需求基线和验收标准。
- `docs/08-data-model.md`：核心实体、状态和结构化输出协议。
- `docs/09-api-and-ai-flow.md`：接口清单、任务状态和 ASR 修正策略。
- `docs/10-low-fidelity-prototype.md`：页面地图、线框图和交互验收。
- `docs/11-technical-architecture.md`：技术栈、目录结构、任务系统和开发顺序。
- `docs/12-git-workflow.md`：Git 操作和远程仓库说明。
- `CONTRIBUTING.md`：正式协作和提交规范。
- `CHANGELOG.md`：版本变更记录。
- `frontend/`：Next.js Web 应用。
- `backend/`：FastAPI API 和测试。
- `infra/docker-compose.yml`：PostgreSQL、API 和 Web 的容器配置。
- `assets/references/private/`：用户提供的老师平台截图，默认不公开。
- `assets/references/private/seed-defense-transcript-2026-11-15.txt`：真实答辩原始记录，仅本地保存。

## 5. 当前要解决的问题

项目已经有第一份真实需求样本。接下来需要把样本分析转化为可实现的数据模型和技术方案。

## 6. 下一步任务

1. 在 `feat/project-scaffold` 上提交并推送当前骨架。
2. 创建 Pull Request，关联 Issue #1。
3. 设计重复发言和重复问题的去重规则。
4. 编写数据库迁移和 `MockLLMProvider`。
5. 完成问题组提取和问题卡展示。
6. 增加 `ModelUsage` 和单场成本记录。

## 7. 未决问题

- 首版使用真实答辩录音还是模拟问答录音。
- 是否提供手动粘贴文字作为低成本入口。
- 原始录音默认保存多久。
- 是否支持本地模型或用户自带 API Key。
- 开源许可证选择 MIT 还是 Apache-2.0。
- 模拟实时提示放在第二轮迭代还是更后。
- 首版是否支持音频文件导入，还是先只支持文字和语音反思。

## 8. 交接规则

- 每次完成一个较大阶段，更新本文件。
- 有新决策时更新 `docs/02-decision-log.md`。
- 不把长对话原文当作唯一上下文，过程和结论要落到文档。
- 如果聊天上下文过长，可以直接新开聊天，不必重新解释整个项目。
