# 个人网页快速上手

这份教程只讲最常用的修改。按下面的文件分工操作，不需要理解整个 React 项目。

## 1. 启动本地预览

在项目文件夹空白处右键打开终端，运行：

```powershell
pnpm run dev
```

终端会显示一个地址，例如：

```text
http://localhost:5173/
```

按住 `Ctrl` 点击地址即可打开网页。端口可能是 `5174`、`5175` 等，以终端显示的地址为准。

保持终端运行。保存代码后，浏览器通常会自动刷新。

## 2. 先记住文件分工

| 想修改的内容 | 文件 |
| --- | --- |
| 姓名、联系方式、首页文字、项目、教育经历 | `src/data.ts` |
| 页面布局、字体、颜色、照片大小 | `src/styles.css` |
| 页面结构和按钮行为 | `src/App.tsx` |
| 独立 HTML CV | `public/cv.html` |
| 文章正文 | `src/content/writing/*.md` |
| 个人照片 | `public/Profile.jpg` |

`src/writing.ts` 只是读取并整理 Markdown 文章的程序，不是在里面写文章。通常只需要修改 `src/data.ts`、`src/content/writing/*.md` 和 `public/cv.html`，不要随意修改 `App.tsx` 或 `writing.ts`。

## 3. 修改姓名和联系方式

打开 `src/data.ts`，找到：

```ts
export const profile = {
```

直接修改对应引号里的文字：

```ts
name: { zh: '晏智翔', en: 'Rooney Yan' },
email: 'zyanbs@connect.ust.hk',
wechatId: 'Essential_Yan',
```

链接的格式如下：

```ts
{ label: 'GitHub', href: 'https://github.com/Rooney-YAN' },
```

只修改引号里的内容，不要删除属性名、冒号或逗号。

## 4. 修改或增加项目

在 `src/data.ts` 中搜索：

```ts
export const projects
```

一个完整项目如下：

```ts
{
  slug: 'dailymodule',
  title: 'DailyModule',
  description: {
    zh: '中文介绍。',
    en: 'English description.',
  },
  status: { zh: '持续开发', en: 'In active development' },
  technologies: ['React', 'TypeScript'],
  highlights: [
    { zh: '中文功能说明。', en: 'English feature description.' },
  ],
  github: 'https://github.com/Rooney-YAN/DailyModule',
  demo: 'https://rooney-yan.github.io/DailyModule/',
  selected: true,
},
```

常用修改：

- 修改文字：只改引号中的内容。
- 删除一条功能：完整删除一个 `{ zh: '...', en: '...' },`。
- 没有演示地址：完整删除 `demo: '...',` 这一行。
- 不在首页展示：把 `selected: true` 改成 `selected: false`。
- 增加项目：复制从 `{` 到 `},` 的完整项目，然后修改内容。

`slug` 只能使用小写英文字母、数字和连字符，例如：

```ts
slug: 'my-new-project',
```

## 5. 修改教育经历

在 `src/data.ts` 中搜索：

```ts
export const education
```

一条教育经历的结构是：

```ts
{
  period: '2025 — 2029',
  location: { zh: '中国香港', en: 'Hong Kong' },
  school: { zh: '香港科技大学', en: 'The Hong Kong University of Science and Technology' },
  degree: { zh: '计算机科学工学学士', en: 'Bachelor of Engineering in Computer Science' },
  details: { zh: '', en: '' },
},
```

如果不需要 `details` 的内容，把引号留空即可，不要删除一半的大括号。

## 6. 修改独立 CV

CV 的所有内容都在：

```text
public/cv.html
```

中文和英文通常成对出现：

```html
<span class="lang-zh">中文内容</span>
<span class="lang-en">English content</span>
```

修改时同时修改两处。

删除一个项目要完整删除：

```html
<article class="entry">
  ...
</article>
```

删除一条列表内容要完整删除：

```html
<li>...</li>
```

不要只删除 `<li>` 或 `</li>` 中的一个，否则 HTML 结构会损坏。

CV 的字体、颜色和间距位于同一个文件顶部的 `<style>` 和 `</style>` 之间。

预览地址是在本地网址后加：

```text
/cv.html
```

例如：

```text
http://localhost:5173/cv.html
```

## 7. 更换照片

最简单的方法：

1. 准备新的照片。
2. 将文件名改为 `Profile.jpg`。
3. 替换 `public/Profile.jpg`。
4. 刷新浏览器。

照片显示大小在 `src/styles.css` 中控制。搜索：

```css
.hero {
```

其中第二列的数字就是桌面端照片宽度：

```css
grid-template-columns: minmax(0, 1fr) 280px;
```

把 `280px` 改大，照片变大；改小则照片变小。

照片比例在这里控制：

```css
.portrait-frame {
  aspect-ratio: 4 / 5;
}
```

## 8. 为什么删一段代码后网页可能打不开

TypeScript、JavaScript 和 HTML 都依赖成对结构：

- 数组：`[ ... ]`
- 对象：`{ ... }`
- HTML 标签：`<article> ... </article>`
- 字符串：`'文字'`

删除内容时，应删除完整属性或完整元素。

错误示例：

```ts
highlights: [
],
```

这虽然是合法的空数组，但如果页面代码假设里面必须有内容，可能影响展示。

更危险的是只删除开头或结尾：

```ts
highlights: [
  { zh: '内容', en: 'Content' },
// 忘记保留 ],
```

这样整个文件都会出现语法错误。

## 9. 修改完成后检查

在终端运行：

```powershell
pnpm run build
```

看到下面的文字说明检查通过：

```text
✓ built
```

如果失败，先看错误信息中的文件名和行号，例如：

```text
src/data.ts:120
```

打开这个文件，检查该行附近的：

- 引号是否成对。
- `{}` 和 `[]` 是否成对。
- 上一行是否缺少逗号。
- 是否只删除了某个结构的一半。

## 10. 最安全的修改习惯

1. 一次只改一小处。
2. 保存后立即看浏览器。
3. 正常后再改下一处。
4. 完成后运行 `pnpm run build`。
5. 不确定时，把准备修改的代码片段发给我，不要直接大范围删除。
