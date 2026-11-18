# Git 工作流与账户说明

- 日期：2026-11-18
- 项目目录：`X:\软件工程-ai面试`
- 当前分支：`main`
- 远程仓库：`https://github.com/xqh300999/Interview-Reflection-AI.git`
- 当前状态：本地 `main` 已推送到 GitHub，远程分支为 `origin/main`

## 1. 当前提交身份

本机全局 Git 配置位于：

```text
C:\Users\zhong\.gitconfig
```

全局配置中的历史提交身份：

```text
user.name  = 300999
user.email = 14987046+xu-qihui300999@user.noreply.gitee.com
```

这说明：

- 初始提交的作者名是 `300999`。
- 初始提交使用的是一个 Gitee noreply 邮箱。
- 项目已经创建 GitHub 远程仓库并完成首次推送。
- 为了让后续提交关联 GitHub 账号，本仓库增加了本地覆盖配置：

```text
user.name  = xqh300999
user.email = 294081472+xqh300999@users.noreply.github.com
```

- 本地配置只影响当前仓库之后的提交。
- 历史提交不会重写，仍保留原来的 Gitee 邮箱。

## 2. Commit 和 Push 的区别

### Commit

`git commit` 只在本机保存一个版本快照。

它不会自动上传到网络。

### Push

`git push` 才会把本地提交上传到远程仓库，例如 GitHub 或 Gitee。

当前情况：

- 已执行多次 `git commit`。
- 已配置 `origin`。
- 已完成首次 `git push -u origin main`。
- 本地 `main` 与 `origin/main` 指向同一个提交。

## 3. 你自己应该去哪里操作

### 方式一：PowerShell

打开 PowerShell，执行：

```powershell
cd X:\软件工程-ai面试
git status
git log --oneline --decorate
git remote -v
```

`git remote -v` 没有输出，说明还没有远程仓库。

### 方式二：VS Code

用 VS Code 打开：

```text
X:\软件工程-ai面试
```

左侧源代码管理面板可以：

- 查看修改。
- 暂存文件。
- 填写提交信息。
- 提交。
- 后续配置远程后执行同步或推送。

### 方式三：Codex 新聊天

新开聊天时，将工作目录设置为：

```text
X:\软件工程-ai面试
```

Codex 会读取 `AGENTS.md` 和项目文档，不需要重新解释历史。

## 4. 每次提交的推荐流程

```powershell
cd X:\软件工程-ai面试
git status
git diff
git add <相关文件>
git commit -m "docs: describe change"
git log --oneline -5
```

不要一次提交无关改动。

提交信息建议：

- `docs:` 文档。
- `feat:` 新功能。
- `fix:` 修复。
- `test:` 测试。
- `refactor:` 重构。
- `chore:` 构建或维护。

## 5. 创建远程仓库

### GitHub

1. 登录 GitHub。
2. 新建一个空仓库。
3. 建议仓库名使用英文，例如 `software-engineering-ai-interview`。
4. 不要勾选自动创建 README、`.gitignore` 或 License，避免和本地历史冲突。
5. 创建后复制仓库地址。

HTTPS 方式：

```powershell
git remote add origin https://github.com/<你的账号>/software-engineering-ai-interview.git
git push -u origin main
```

SSH 方式：

```powershell
git remote add origin git@github.com:<你的账号>/software-engineering-ai-interview.git
git push -u origin main
```

### Gitee

1. 登录 Gitee。
2. 新建空仓库。
3. 不要自动生成 README 和初始提交。
4. 复制仓库地址。

HTTPS 方式：

```powershell
git remote add origin https://gitee.com/<你的账号>/software-engineering-ai-interview.git
git push -u origin main
```

SSH 方式：

```powershell
git remote add origin git@gitee.com:<你的账号>/software-engineering-ai-interview.git
git push -u origin main
```

## 6. 以后日常推送

远程仓库配置成功后：

```powershell
git status
git add <相关文件>
git commit -m "feat: implement text import"
git push
```

## 7. 认证和密钥

- 不要把 GitHub 或 Gitee 密码写进项目。
- 不要把 Personal Access Token 写进代码、文档或 Git 配置。
- 推荐使用 Git Credential Manager 或 SSH Key。
- `.env` 和 `assets/references/private/` 已被 `.gitignore` 排除。
- 公开仓库前必须检查是否包含真实答辩录音、老师平台截图和个人信息。

## 8. 是否修改提交邮箱

当前提交使用 Gitee noreply 邮箱。

如果以后主要使用 GitHub：

```powershell
git config user.name "<你的 GitHub 显示名>"
git config user.email "<你的 GitHub noreply 邮箱>"
```

注意：

- 修改配置只影响之后的提交。
- 已有的历史提交作者不会自动改变。
- 不需要为了提交邮箱删除或重做当前仓库。

## 9. 分支建议

首版单人开发可以采用简单分支策略：

- `main`：稳定可演示版本。
- `feat/<功能名>`：新功能。
- `fix/<问题名>`：修复。

小改动可以直接在 `main` 提交；较大功能使用短分支，完成后合并。

## 10. 正式化仓库配置

当前仓库已增加：

- `CONTRIBUTING.md`：分支、提交、PR 和隐私规范。
- `CHANGELOG.md`：版本变更记录。
- `.gitattributes`：统一换行和二进制文件处理。
- `.github/PULL_REQUEST_TEMPLATE.md`：Pull Request 自查模板。
- `.github/ISSUE_TEMPLATE/`：功能和缺陷 Issue 模板。

远程仓库创建后，建议在 GitHub 或 Gitee 中配置：

### 分支保护

- 保护 `main`。
- 禁止直接删除 `main`。
- 重要功能通过 Pull Request 合并。
- 单人开发也要求自审 PR 清单。
- 如果平台支持，启用线性历史或 squash merge。

### Issue 和里程碑

- 每个功能先建 Issue。
- 用 `feature`、`bug`、`docs`、`test`、`security` 标签分类。
- 用 Milestone 管理 `Sprint 1`、`Sprint 2` 和 `v0.1.0`。

### 发布

- `v0.1.0` 对应文字导入和问题卡闭环。
- `v0.2.0` 对应语音反思、重答和复习。
- `v0.3.0` 对应录音上传和 ASR 修正。
- 每次发布写 Release Notes，并更新 `CHANGELOG.md`。

### 单人开发的最小正式流程

```text
创建 Issue
→ 切出 feat 或 docs 分支
→ 提交
→ 推送分支
→ 创建 Pull Request
→ 按模板自查
→ 合并到 main
→ 删除分支
```

这套流程不会显著增加时间，却能让老师看到需求、实现和验证之间的对应关系。
