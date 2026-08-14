# Personal Page

一个使用 React、TypeScript 和 Vite 构建的静态个人主页，可直接部署到 GitHub Pages。

## 修改内容

所有个人信息、项目、经历与技能都集中在 `src/data.ts`。修改这个文件即可完成大部分内容更新。

页面结构在 `src/App.tsx`，视觉样式在 `src/styles.css`。

## 本地预览

```bash
pnpm install
pnpm dev
```

## 发布到 GitHub Pages

1. 在 GitHub 新建一个仓库并推送本项目。
2. 打开仓库的 **Settings → Pages**。
3. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
4. 推送到 `main` 或 `master` 分支后，部署流程会自动运行。

如果这是你的主个人站点，仓库名应为 `你的用户名.github.io`；否则会以 `你的用户名.github.io/仓库名/` 访问。
