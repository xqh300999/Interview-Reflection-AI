# 软件工程 AI 面试复盘助手

> 暂定产品名：答辩错题本  
> 当前阶段：Sprint 0，立项与需求基线  
> 执行方式：单人开发、两周 MVP

## 一句话定位

把真实面试或项目答辩中的问题、追问和回答，整理成可以反思、重答和长期复习的个人问题资产。

首版聚焦：

> 帮助应届生和在校生讲清楚自己的软件项目，并应对老师、评审和面试官的追问。

## 为什么做这个项目

通用 AI 可以分析一份转写文本，但一次分析不会自动形成：

- 结构化的问题卡。
- 完整的问题与追问链。
- 可引用的回答缺口。
- 用户自己的语音反思。
- 重答前后的对比。
- 跨场次的重复弱点。

本项目要做的不是另一个 AI 面试官，而是面试和答辩之后的学习闭环。

## 当前不做

- 不做实时 AI 评审平台。
- 不做多角色评审大厅。
- 不把实际面试中的隐藏式答案生成作为核心功能。
- 不生成完美答案让用户背诵。
- 不在首版追求社交、排行榜或企业管理功能。

## 文档阅读顺序

1. `AGENTS.md`：项目工作规则和交接要求。
2. `docs/00-project-charter.md`：项目目标、范围、约束和成功标准。
3. `docs/01-project-vision-and-competition.md`：产品构想、竞品分析和完整方案。
4. `docs/02-decision-log.md`：关键决策及其原因。
5. `docs/03-context-handoff.md`：新聊天交接信息和下一步。
6. `docs/04-initial-backlog.md`：初始需求池和验收方向。
7. `docs/05-seed-sample-analysis.md`：第一份真实答辩样本分析。
8. `docs/06-question-bank-v0.1.md`：种子问题卡与分类。
9. `docs/07-requirements-baseline.md`：第一版功能需求、非功能需求和验收目标。
10. `docs/08-data-model.md`：核心数据结构、状态机、隐私约束和结构化输出协议。

## 计划目录

```text
软件工程-ai面试/
├─ AGENTS.md
├─ README.md
├─ docs/
│  ├─ 00-project-charter.md
│  ├─ 01-project-vision-and-competition.md
│  ├─ 02-decision-log.md
│  ├─ 03-context-handoff.md
│  ├─ 04-initial-backlog.md
│  ├─ 05-seed-sample-analysis.md
│  ├─ 06-question-bank-v0.1.md
│  ├─ 07-requirements-baseline.md
│  └─ 08-data-model.md
├─ assets/
│  └─ references/
│     ├─ README.md
│     └─ private/
├─ src/              # 后续实现时创建
├─ tests/            # 后续实现时创建
└─ scripts/          # 后续实现时创建
```

## 软件过程

项目采用轻量 Scrum 加迭代增量方式：

- Sprint 0：立项、范围、用户、风险和需求基线。
- Sprint 1：问题卡、导入和结构化分析。
- Sprint 2：反思、重答、复习和低成本部署。
- 每个阶段记录决策、验收结果和风险变化。
- 使用 Git 管理版本，重要决策进入决策日志。

## 当前状态

项目已经完成第一份真实答辩样本分析、20 张种子问题卡、第一版需求基线和数据模型，尚未开始产品代码实现。下一步是设计 API、低成本 AI 调用流程和低保真原型。
