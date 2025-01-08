const path = require("path");
const fs = require("fs");
module.exports = {
    // async buildStart() {
    //     console.log('>> build start');
    // },
    async generateEnd(params) {
        console.log('>> generate end', params.stats.assets);
        // params.stats.assets.forEach(asset => {
        //     console.log('>> asset:', asset.name);
        // });
        // const assetManifestPath = path.join(params.stats.outputPath.toString(), 'asset-manifest.json');
        // let ok = fs.existsSync(assetManifestPath);
        // if (!ok) {
        //
        // }
        // const manifestPath = path.join(params.stats.outputPath.toString(), 'manifest.json');
        // ok = fs.existsSync(manifestPath)
        // if (!ok) {
        //     console.error('manifest.json not found.');
        //     return;
        // }

        // const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath, 'utf-8'));
        const outputPath = params.stats.outputPath.toString()
        const indexPath = path.join(outputPath, 'index.html');
        if (!fs.existsSync(indexPath)) {
            console.error('index.html not found.');
            return;
        }

        let updatedHtmlContent = fs.readFileSync(indexPath, 'utf-8');
        const assets = params.stats.assets;
        Object.entries(assets).forEach(([_, asset]) => {
            const {name: name, path: file} = asset;
            // 使用 path.posix.relative 计算相对路径
            const value = path.relative(outputPath, file);
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
    // async load(path) {
    //     console.log('>> load:', path);
    // }
};