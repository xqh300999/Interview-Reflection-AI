# Interview Reflection Web

答辩错题本的前端应用。

## 开发

```powershell
npm install
npm run dev
```

默认访问：

```text
http://127.0.0.1:3000
```

API 地址通过环境变量配置：

```text
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

## 当前页面

- `/`：复盘首页。
- `/sessions/new`：文字问答导入和解析预览。
- `/review`：复习中心空状态。

## 检查

```powershell
npm run lint
npm run build
```
