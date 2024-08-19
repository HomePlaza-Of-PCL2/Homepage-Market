import { FileIO } from "./FileIO.js";
import util from "util";
async function loadTemplates() {
    return {
        components: {
            Apage: await new FileIO("templates/xaml/components/Apage.xaml").readFile(),
            BtnCopy: await new FileIO("templates/xaml/components/BtnCopy.xaml").readFile(),
            BtnIssue: await new FileIO("templates/xaml/components/BtnIssue.xaml").readFile(),
            BtnLoad: await new FileIO("templates/xaml/components/BtnLoad.xaml").readFile(),
            BtnRepo: await new FileIO("templates/xaml/components/BtnRepo.xaml").readFile(),
            Footer: await new FileIO("templates/xaml/components/Footer.xaml").readFile(),
            Framework: await new FileIO("templates/xaml/components/Framework.xaml").readFile(),
            Header: await new FileIO("templates/xaml/components/Header.xaml").readFile(),
        },
        markdown: {
            H1: await new FileIO("templates/xaml/markdown/H1.xaml").readFile(),
            H2: await new FileIO("templates/xaml/markdown/H2.xaml").readFile(),
            H3: await new FileIO("templates/xaml/markdown/H3.xaml").readFile(),
            H4: await new FileIO("templates/xaml/markdown/H4.xaml").readFile(),
            H5: await new FileIO("templates/xaml/markdown/H5.xaml").readFile(),
            H6: await new FileIO("templates/xaml/markdown/H6.xaml").readFile(),
            Text: await new FileIO("templates/xaml/markdown/Text.xaml").readFile(),
        },
        styles: {
            Icons: await new FileIO("templates/xaml/styles/Icons.xaml").readFile(),
            PresetControls: await new FileIO("templates/xaml/styles/PresetControls.xaml").readFile(),
            Styles: await new FileIO("templates/xaml/styles/Styles.xaml").readFile(),
        },
    };
}
export class Generator {
    xaml_template;
    constructor() {
        this.xaml_template = null;
    }
    async initalize() {
        this.xaml_template = await loadTemplates();
        return this;
    }
    async generateXaml(type, ...data) {
        if (this.xaml_template === null)
            throw new Error("XAML template not loaded, call initalize first");
        let template;
        switch (type) {
            case "Apage":
                template = this.xaml_template.components.Apage;
                break;
            case "BtnCopy":
                template = this.xaml_template.components.BtnCopy;
                break;
            case "BtnIssue":
                template = this.xaml_template.components.BtnIssue;
                break;
            case "BtnLoad":
                template = this.xaml_template.components.BtnLoad;
                break;
            case "BtnRepo":
                template = this.xaml_template.components.BtnRepo;
                break;
            case "Footer":
                template = this.xaml_template.components.Footer;
                break;
            case "Framework":
                template = this.xaml_template.components.Framework;
                break;
            case "Header":
                template = this.xaml_template.components.Header;
                break;
            case "H1":
                template = this.xaml_template.markdown.H1;
                break;
            case "H2":
                template = this.xaml_template.markdown.H2;
                break;
            case "H3":
                template = this.xaml_template.markdown.H3;
                break;
            case "H4":
                template = this.xaml_template.markdown.H4;
                break;
            case "H5":
                template = this.xaml_template.markdown.H5;
                break;
            case "H6":
                template = this.xaml_template.markdown.H6;
                break;
            case "Text":
                template = this.xaml_template.markdown.Text;
                break;
            case "Icons":
                template = this.xaml_template.styles.Icons;
                break;
            case "PresetControls":
                template = this.xaml_template.styles.PresetControls;
                break;
            case "Styles":
                template = this.xaml_template.styles.Styles;
                break;
            default:
                throw new Error(`无效的模板类型 "${type}"`);
        }
        return util.format(template, ...data);
    }
}
