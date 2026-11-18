# 贡献规范

本项目按软件工程过程推进。即使当前只有一名开发者，也保留可追踪的 Issue、分支、提交和 Pull Request 流程。

## 1. 工作流

推荐流程：

```text
Issue
→ 分支
→ 开发或编写文档
→ 自测
→ Pull Request
→ 自查清单
→ 合并到 main
```

文档小改动可以直接在 `docs/...` 分支提交，但涉及范围、架构、数据模型和接口的变更必须更新决策日志。

## 2. 分支命名

- `feat/<name>`：新功能。
- `fix/<name>`：问题修复。
- `docs/<name>`：文档变更。
- `test/<name>`：测试补充。
- `refactor/<name>`：不改变行为的重构。
- `chore/<name>`：构建、配置和维护。

示例：

```text
feat/text-import
feat/question-card
fix/job-idempotency
docs/api-flow
```

## 3. 提交信息

使用 Conventional Commits 风格：

```text
feat: add text import endpoint
fix: prevent duplicate analysis jobs
docs: define question card data model
test: cover seed sample extraction
refactor: isolate llm provider
chore: add docker compose
```

一次提交只处理一个明确目的。不要在一个提交中混入无关格式化、文档和功能改动。

## 4. 文档优先规则

以下变更先更新文档：

- 产品范围和用户流程。
- 数据模型。
- API 接口。
- AI 提示词和输出协议。
- 隐私、录音和模型成本。
- 架构和技术栈。

文档确认后再写代码，代码提交中引用对应文档或 Issue。

## 5. 提交前检查

- `git status` 只包含本次任务的改动。
- `git diff` 没有无关修改。
- 没有提交 `.env`、API Key、真实录音或私有截图。
- 新增行为有测试或可复现验证步骤。
- 重要决策已更新 `docs/02-decision-log.md`。
- 阶段状态已更新 `docs/03-context-handoff.md`。

## 6. Pull Request 要求

PR 描述至少包含：

- 目的。
- 主要改动。
- 用户可见变化。
- 测试方式。
- 风险和数据影响。
- 未完成事项。

单人项目也要执行自查，避免把“我写完了”当成验收标准。

## 7. 数据与隐私

不得提交：

- `assets/references/private/` 中的文件。
- 真实答辩录音和原始转写。
- 老师平台截图。
- API Key、密码、访问令牌。
- 未脱敏的用户项目数据。

公开演示使用重新编写的模拟样本。

## 8. 版本和发布

- `main` 保持可运行或至少可演示。
- 重要阶段完成后打标签，例如 `v0.1.0`。
- Release 说明包含新增功能、已知限制和部署方式。
- 许可证在正式公开前由项目负责人确认。
