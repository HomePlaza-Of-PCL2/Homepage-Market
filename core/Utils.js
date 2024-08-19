import { promises as fs } from "fs";
import path from "path";
/**
 * 获取指定目录下所有指定后缀名的文件
 * @param {string} dirPath - 要遍历的目录路径
 * @param {string} ext - 文件后缀名（例如 ".txt"）
 * @returns {Promise<string[]>} - 具有指定后缀名的文件路径数组
 */
export async function getFilesWithExtension(dirPath, ext) {
    let results = [];
    // 读取目录下的所有文件和子目录
    const list = await fs.readdir(dirPath);
    // 遍历文件和子目录
    for (const file of list) {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            // 如果是目录，递归调用 getFilesWithExtension
            const filesInDir = await getFilesWithExtension(filePath, ext);
            results = results.concat(filesInDir);
        }
        else if (path.extname(file) === ext) {
            // 如果是文件且扩展名匹配，添加到结果数组
            results.push(filePath);
        }
    }
    return results;
}
