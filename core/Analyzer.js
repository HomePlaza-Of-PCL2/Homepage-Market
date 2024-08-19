import { FileIO } from "./FileIO.js";
export class Analyzer {
    filename;
    filedata;
    filelines;
    constructor(filename) {
        this.filename = filename;
        this.filedata = null;
        this.filelines = null;
    }
    async initalize() {
        this.filedata = await new FileIO(this.filename).readFile();
        this.filelines = this.filedata.split("\n");
        console.log(`<Analyzer> 初始化文件 ${this.filename}`);
    }
    analyze() {
        if (this.filedata === null || this.filelines === null)
            throw new Error("文件未初始化，您应当先调用 initalize 方法");
        if (this.filedata.split("---")[0] === this.filedata)
            throw new Error(`${this.filename} 缺失头部元数据`);
        // Headers
        const headerlines = this.filedata.split("---")[1].split("\r\n");
        const header = {
            AUTHOR: "",
            TITLE: "",
            REPOLINK: "",
            BUGLINK: "",
            COPYLINK: "",
            LOADLINK: "",
        };
        headerlines.forEach((line) => {
            const [key, value] = line.split(": ");
            if (key in header)
                header[key] = value;
        });
        // Contents
        const contentlines = this.filedata
            .split("---")[2]
            .split("\r\n")
            .slice(2, -1);
        const content = [];
        let Mark_IsInXamlInject_Mode = false;
        let cache;
        contentlines.forEach((line) => {
            if (line.toUpperCase() === "<!-- XAMLSTART -->") {
                console.log("<Analyzer> 进入 XoM 模式");
                Mark_IsInXamlInject_Mode = true;
                cache = [];
            }
            else if (line.toUpperCase() === "<!-- XAMLEND -->") {
                console.log("<Analyzer> 退出 XoM 模式");
                Mark_IsInXamlInject_Mode = false;
                content.push({
                    type: "XAML",
                    content: cache.join(""),
                });
                cache = [];
            }
            else {
                if (Mark_IsInXamlInject_Mode) {
                    console.log(`<Analyzer> XoM 模式写入 ${line}`);
                    cache.push(line);
                }
                else {
                    console.log(`<Analyzer> MD 模式写入 ${line}`);
                    if (line.startsWith("#")) {
                        content.push({
                            type: "H1",
                            content: line.replace("# ", ""),
                        });
                    }
                    else if (line.startsWith("##")) {
                        content.push({
                            type: "H2",
                            content: line.replace("## ", ""),
                        });
                    }
                    else if (line.startsWith("###")) {
                        content.push({
                            type: "H3",
                            content: line.replace("### ", ""),
                        });
                    }
                    else if (line.startsWith("####")) {
                        content.push({
                            type: "H4",
                            content: line.replace("#### ", ""),
                        });
                    }
                    else if (line.startsWith("#####")) {
                        content.push({
                            type: "H5",
                            content: line.replace("##### ", ""),
                        });
                    }
                    else if (line.startsWith("######")) {
                        content.push({
                            type: "H6",
                            content: line.replace("###### ", ""),
                        });
                    }
                    else if (line.startsWith(">")) {
                        content.push({
                            type: "Quote",
                            content: line.replace("> ", ""),
                        });
                    }
                    else {
                        content.push({ type: "Text", content: line });
                    }
                }
            }
        });
        return { header, content };
    }
}
