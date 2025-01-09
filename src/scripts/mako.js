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
    // injectAssetsIntoHTML();
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
