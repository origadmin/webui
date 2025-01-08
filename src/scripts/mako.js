#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const {build} = require('@umijs/mako');
const {isStringObject} = require('node:util/types');
const cwd = process.cwd();

console.log('> run mako build for', cwd);
const config = getMakoConfig();

build({
    root: cwd,
    config,
    less: {
        modifyVars: config.less?.theme || {},
    },
    clean: true,
    plugins: getPlugins(),
    watch: process.argv.includes('--watch'),
}).catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(() => {
    injectAssetsIntoHTML();
    console.log('> mako build done');
});

function getPlugins() {
    let plugins = [];
    const pluginsPath = path.join(cwd, 'plugins.config.js');
    if (fs.existsSync(pluginsPath)) {
        plugins.push(...require(pluginsPath));
    }
    return plugins;
}

function getMakoConfig() {
    let makoConfig = {};
    const makoConfigPath = path.join(cwd, 'mako.config.json');
    if (fs.existsSync(makoConfigPath)) {
        makoConfig = JSON.parse(fs.readFileSync(makoConfigPath, 'utf-8'));
    }
    makoConfig.resolve = makoConfig.resolve || {};
    makoConfig.resolve.alias = makoConfig.resolve.alias || {};
    Object.keys(makoConfig.resolve.alias).forEach((key) => {
        if (isStringObject(makoConfig.resolve.alias[key])) {
            makoConfig.resolve.alias[key] = path.resolve(
                cwd,
                makoConfig.resolve.alias[key],
            );
        } else {
            console.log("> resolve path:", makoConfig.resolve.alias[key]);
        }
    });
    return makoConfig;
}
//
// function injectAssetsIntoHTML() {
//     const assetManifestPath = path.join(cwd, 'dist', 'asset-manifest.json');
//     if (!fs.existsSync(assetManifestPath)) {
//         console.error('asset-manifest.json not found.');
//         return;
//     }
//
//     const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath, 'utf-8'));
//
//     const indexPath = path.join(cwd, 'dist', 'index.html');
//     if (!fs.existsSync(indexPath)) {
//         console.error('index.html not found.');
//         return;
//     }
//
//     const indexHtmlContent = fs.readFileSync(indexPath, 'utf-8');
//
//     let updatedHtmlContent = indexHtmlContent;
//
//     Object.entries(assetManifest).forEach(([key, value]) => {
//         if (key.endsWith('.css')) {
//             const linkTag = `    <link rel="stylesheet" href="./${value}">\n`;
//             updatedHtmlContent = updatedHtmlContent.replace('</head>', `${linkTag}</head>`);
//         } else if (key.endsWith('.js')) {
//             const scriptTag = `<script type="module" src="./${value}"></script>\n`;
//             updatedHtmlContent = updatedHtmlContent.replace('</body>', `${scriptTag}</body>`);
//         }
//     });
//
//     fs.writeFileSync(indexPath, updatedHtmlContent, 'utf-8');
//     console.log('Assets injected into index.html successfully.');
// }