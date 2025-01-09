const path = require("path");
const fs = require("fs");
module.exports = {
    async load(path) {
        console.log('>> load:', path);
    },
    async generateEnd(params) {
        console.log('>> show generate end assets:', params.stats.assets);
        const outputPath = params.stats.outputPath.toString()
        const indexPath = path.join(outputPath, 'index.html');
        if (!fs.existsSync(indexPath)) {
            console.error('index.html not found.');
            return;
        }

        let updatedHtmlContent = fs.readFileSync(indexPath, 'utf-8');
        const assets = params.stats.assets;
        Object.entries(assets).forEach(([_, asset]) => {
            const {name: name, path: filePath} = asset;
            let value = filePath;
            if (path.isAbsolute(filePath)) {
                value = path.relative(outputPath, filePath);
            }
            console.log('>> asset:', value, filePath, outputPath);
            if (name.endsWith('.css')) {
                const linkTag = `    <link rel="stylesheet" href="./${value}">\n`;
                updatedHtmlContent = updatedHtmlContent.replace('</head>', `${linkTag}</head>`);
            } else if (name.endsWith('.js')) {
                const scriptTag = `<script type="module" src="./${value}"></script>\n`;
                updatedHtmlContent = updatedHtmlContent.replace('</body>', `${scriptTag}</body>`);
            }
        });

        fs.writeFileSync(indexPath, updatedHtmlContent, 'utf-8');
        console.log('Assets injected into index.html successfully.');
    },
};