# Rooney Yan — Personal Website

使用 React、TypeScript 和 Vite 构建，并通过 GitHub Actions 部署到 GitHub Pages。

## 内容结构

- Home：当前方向、精选项目、研究与近期写作
- Projects：项目列表与独立详情页
- Research：进行中的本科研究与论文发表
- Writing：由 `src/content/writing/*.md` 自动生成的文章系统
- About：教育、研究 / 经历、技能、CV 与联系方式

## 新增文章

复制 `src/content/writing/_template.md`，将文件名改为文章 slug（不要以下划线开头），填写 front matter 后直接使用 Markdown 写作。支持 `Technology`、`Markets`、`Ideas` 三个分类，以及 `zh`、`en`、`both` 三种语言标记。

## 本地开发

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
```
