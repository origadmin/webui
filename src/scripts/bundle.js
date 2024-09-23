module.exports = {
    async load(path) {
        // console.log("build result", parseBuildResult(path));
        if (path.endsWith('index.html')) {
            console.log(path);
            return {
                content: `export default () => <Foooo>.hoo</Foooo>;`,
                type: 'html',
            };
        }
    }
};

