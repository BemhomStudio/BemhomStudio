// 路径管理工具
class PathManager {
    constructor() {
        this.config = null;
        this.basePath = '';
    }

    // 初始化配置
    async init() {
        try {
            const response = await fetch('/bemhomstudio/config.json');
            this.config = await response.json();
            this.basePath = this.config.basePath;
        } catch (error) {
            console.error('Failed to load config:', error);
            // 如果加载失败，使用空字符串作为基础路径
            this.basePath = '';
        }
    }

    // 获取完整路径
    getFullPath(path) {
        if (!path) return '';
        // 如果路径已经是完整URL，直接返回
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        // 移除开头的斜杠，避免重复
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${this.basePath}/${cleanPath}`;
    }

    // 更新所有资源引用
    updateResourcePaths() {
        // 更新图片路径
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.src.startsWith('http')) {
                img.src = this.getFullPath(img.src);
            }
        });

        // 更新链接路径
        document.querySelectorAll('a').forEach(link => {
            if (link.href && !link.href.startsWith('http')) {
                // 处理相对路径
                if (link.href.startsWith('../')) {
                    // 将相对路径转换为绝对路径
                    const currentPath = window.location.pathname;
                    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
                    const targetPath = link.href.replace('../', '');
                    link.href = this.getFullPath(`${parentPath}/${targetPath}`);
                } else {
                    link.href = this.getFullPath(link.href);
                }
            }
        });

        // 更新样式表路径
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.href && !link.href.startsWith('http')) {
                // 处理相对路径
                if (link.href.startsWith('../')) {
                    const currentPath = window.location.pathname;
                    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
                    const targetPath = link.href.replace('../', '');
                    link.href = this.getFullPath(`${parentPath}/${targetPath}`);
                } else {
                    link.href = this.getFullPath(link.href);
                }
            }
        });

        // 更新脚本路径
        document.querySelectorAll('script').forEach(script => {
            if (script.src && !script.src.startsWith('http')) {
                script.src = this.getFullPath(script.src);
            }
        });
    }
}

// 创建全局实例
window.pathManager = new PathManager();

// 初始化并更新路径
document.addEventListener('DOMContentLoaded', async () => {
    await window.pathManager.init();
    window.pathManager.updateResourcePaths();
}); 