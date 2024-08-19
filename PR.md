# Homepage-Market PR 规范

## 注意事项

1. 请不要直接修改任意 `.js` 文件，这些变动应该提至 [Builder 仓库](https://github.com/HomePlaza-Of-PCL2/Homepage-Market-Builder)
2. `input` 文件夹中的内容按照文件资源管理器的排布顺序决定输出的顺序，所以请在 PR 时不要在开头加数字\
   我们会在 PR 合并之后按照主页质量进行排序
3. Markdown 文档请务必按照下方的规范编写，否则构建会有异常

## Markdown 编写规范

1. 请在开头附加以下元数据

   ```markdown
   ---
   AUTHOR:
   TITLE:
   REPOLINK:
   BUGLINK:
   COPYLINK:
   LOADLINK:
   ---
   ```

   | 字段     | 含义          | 是否必填 |
   | -------- | ------------- | -------- |
   | AUTHOR   | 作者          | 是       |
   | TITLE    | 标题          | 是       |
   | REPOLINK | 仓库链接      | 否       |
   | BUGLINK  | Bug 报告链接  | 否       |
   | COPYLINK | XAML 文件链接 | 是       |
   | LOADLINK | JSON 文件链接 | 否       |

2. 正文的上下方请各空出完整的一行\
   即如下所示
   ```markdown
   ---
   ...
   ---
   (这里完整的空一行)
   正文
   (这里完整的空一行)
   ```

3. 当你需要直接写入 XAML 内容时，请分别在开头和结尾加上以下注释
   并请务必注意成对使用
   ```markdown
   <!-- XAMLSTART  -->
   <!-- XAMLEND -->
   ```