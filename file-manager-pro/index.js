/**
 * File-Manager-Pro: 本地文件管家
 * 批量重命名、分类归档、格式转换、内容提取
 */

const fs = require('fs');
const path = require('path');

class FileManagerPro {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
  }

  // 列出文件
  listFiles(dir = this.rootDir, options = {}) {
    const { recursive = false, filter = null } = options;
    const files = [];

    const scan = (currentDir, depth = 0) => {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          if (recursive && depth < 5) {
            scan(fullPath, depth + 1);
          }
        } else {
          const fileInfo = {
            name: item,
            path: fullPath,
            size: stat.size,
            ext: path.extname(item),
            modified: stat.mtime
          };

          if (!filter || filter(fileInfo)) {
            files.push(fileInfo);
          }
        }
      });
    };

    scan(dir);
    return files;
  }

  // 批量重命名
  batchRename(files, renameFunc) {
    const results = [];
    
    files.forEach(file => {
      const dir = path.dirname(file);
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const newName = renameFunc(name, file);
      const newPath = path.join(dir, newName + ext);

      try {
        fs.renameSync(file, newPath);
        results.push({ from: file, to: newPath, success: true });
      } catch (err) {
        results.push({ from: file, error: err.message, success: false });
      }
    });

    return results;
  }

  // 按类型分类
  organizeByType(sourceDir, targetDir) {
    const files = this.listFiles(sourceDir);
    const categories = {
      images: [],
      documents: [],
      videos: [],
      audio: [],
      code: [],
      other: []
    };

    files.forEach(file => {
      const ext = file.ext.toLowerCase();
      
      if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'].includes(ext)) {
        categories.images.push(file);
      } else if (['.doc', '.docx', '.pdf', '.txt', '.md', '.xls', '.xlsx'].includes(ext)) {
        categories.documents.push(file);
      } else if (['.mp4', '.avi', '.mov', '.wmv'].includes(ext)) {
        categories.videos.push(file);
      } else if (['.mp3', '.wav', '.flac', '.aac'].includes(ext)) {
        categories.audio.push(file);
      } else if (['.js', '.ts', '.py', '.java', '.cpp', '.c'].includes(ext)) {
        categories.code.push(file);
      } else {
        categories.other.push(file);
      }
    });

    // 创建分类目录并移动文件
    Object.keys(categories).forEach(category => {
      const categoryDir = path.join(targetDir, category);
      
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      categories[category].forEach(file => {
        const targetPath = path.join(categoryDir, file.name);
        fs.renameSync(file.path, targetPath);
      });
    });

    return categories;
  }

  // 搜索文件
  search(query, dir = this.rootDir) {
    const results = [];
    const files = this.listFiles(dir, { recursive: true });

    files.forEach(file => {
      if (file.name.toLowerCase().includes(query.toLowerCase())) {
        results.push(file);
      }
    });

    return results;
  }

  // 获取统计信息
  getStats(dir = this.rootDir) {
    const files = this.listFiles(dir, { recursive: true });
    
    const stats = {
      total: files.length,
      byType: {},
      totalSize: 0,
      largest: null,
      recent: []
    };

    files.forEach(file => {
      const ext = file.ext || 'no-ext';
      stats.byType[ext] = (stats.byType[ext] || 0) + 1;
      stats.totalSize += file.size;

      if (!stats.largest || file.size > stats.largest.size) {
        stats.largest = file;
      }
    });

    // 最近修改的文件
    stats.recent = files
      .sort((a, b) => b.modified - a.modified)
      .slice(0, 10);

    return stats;
  }
}

module.exports = FileManagerPro;
