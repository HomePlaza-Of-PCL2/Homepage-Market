import { Generator } from "./core/Generator.js";
import { Analyzer } from "./core/Analyzer.js";
import { FileIO } from "./core/FileIO.js";
import { getFilesWithExtension } from "./core/Utils.js";
const main = async () => {
    console.log("\n欢迎使用 JMBuilder (PCL 主页市场构建工具)\n");
    // <begin> 1.i
    console.log("(1.i): 开始生成头部");
    const Header = await (await new Generator().initalize()).generateXaml("Header");
    // <end> 1.i
    // <begin> 1.ii.a
    const Resources = [];
    console.log("(1.ii.a): 开始生成资源");
    // 1.ii.a.a
    console.log("(1.ii.a.a): 开始生成 Styles");
    const styles = await (await new Generator().initalize()).generateXaml("Styles");
    Resources.push(styles);
    // 1.ii.a.b
    console.log("(1.ii.a.b): 开始生成 Icons");
    const icons = await (await new Generator().initalize()).generateXaml("Icons");
    Resources.push(icons);
    // 1.ii.a.c
    console.log("(1.ii.a.c): 开始生成 PresetControls");
    const presetcontrols = await (await new Generator().initalize()).generateXaml("PresetControls");
    Resources.push(presetcontrols);
    // <end> 1.ii.a
    // <begin> 1.ii.b
    const markdownfilelist = await getFilesWithExtension("./input/", ".md");
    console.log("(1.ii.b): 需要制作的 Markdown 文件", markdownfilelist);
    const MainCards = [];
    // <loop> 1.ii.b
    for (const file of markdownfilelist) {
        console.log("Loop(1.ii.b): 开始处理文件", file);
        // 1.ii.b.a
        console.log("(1.ii.b.a): 开始分析文件", file);
        const analyzer = new Analyzer(file);
        await analyzer.initalize();
        const { header, content } = analyzer.analyze();
        // 1.ii.b.b
        console.log("(1.ii.b.b): 开始生成文件", file, "的 BtnCopy");
        const BtnCopy = header.COPYLINK === ""
            ? ""
            : await (await new Generator().initalize()).generateXaml("BtnCopy", header.COPYLINK);
        // 1.ii.b.c
        console.log("(1.ii.b.c): 开始生成文件", file, "的 BtnIssue");
        const BtnIssue = header.BUGLINK === ""
            ? ""
            : await (await new Generator().initalize()).generateXaml("BtnIssue", header.BUGLINK);
        // 1.ii.b.d
        console.log("(1.ii.b.d): 开始生成文件", file, "的 BtnLoad");
        const BtnLoad = header.LOADLINK === ""
            ? ""
            : await (await new Generator().initalize()).generateXaml("BtnLoad", header.LOADLINK);
        // 1.ii.b.e
        console.log("(1.ii.b.e): 开始生成文件", file, "的 BtnRepo");
        const BtnRepo = header.REPOLINK === ""
            ? ""
            : await (await new Generator().initalize()).generateXaml("BtnRepo", header.REPOLINK);
        const Contents = [];
        // <loop> 1.ii.b.f
        console.log("Loop(1.ii.b.f): 开始生成文件", file, "的正文");
        for (const item of content) {
            const content = await (await new Generator().initalize()).generateXaml(
            // Ignore Note: 类型重叠但是报错
            // @ts-ignore
            item.type, item.content);
            Contents.push(content);
        }
        // <gen> 1.ii.b
        const maincard = await (await new Generator().initalize()).generateXaml("Apage", header.TITLE, Contents.length === 1 ? Contents[0] : Contents.join("\r\n"), BtnRepo, BtnIssue, BtnCopy, BtnLoad, header.AUTHOR);
        MainCards.push(maincard);
    }
    // <end> 1.ii.b
    // <begin> 1.iii
    const hash = process.env.HASH || "Unknown";
    const result = [];
    if (hash === "Unknown") {
        result.push("Unknown");
        result.push("弹出窗口");
        result.push("提示|未获取到提交哈希\\n如果你是普通用户，请向主页作者报告此问题");
    }
    else {
        result.push(hash);
        result.push("打开网页");
        result.push(`https://github.com/HomePlaza-Of-PCL2/Homepage-Market/commit/${hash}`);
    }
    console.log("(1.iii): 开始生成 Footer");
    const Footer = await (await new Generator().initalize()).generateXaml("Footer", result[0], result[1], result[2]);
    // <end> 1.iii
    // <begin> 1
    console.log("(1): 开始生成完整主页");
    const Main = await (await new Generator().initalize()).generateXaml("Framework", Header, Resources.join("\r\n"), MainCards.length === 1 ? MainCards[0] : MainCards.join("\r\n"), Footer);
    // <end> 1
    // <begin> 2
    console.log("(2): 开始写入文件");
    new FileIO("./Custom.xaml").writeFile(Main);
    // <end> 2
};
main();
